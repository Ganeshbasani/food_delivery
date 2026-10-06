import Stripe from "stripe";
import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import { assert } from "../utils/httpError.js";
import { pickAddress, cleanText, isPositiveInt } from "../utils/validation.js";
import { logger } from "../utils/logger.js";
import { calculateOrderTotals } from "../utils/pricing.js";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const currency = String(process.env.CURRENCY || "usd").toLowerCase();
const deliveryFee = Number(process.env.DELIVERY_FEE || 2);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const statusValues = ["PLACED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

const normalizeItems = (items) => {
  assert(Array.isArray(items) && items.length > 0 && items.length <= 50, 422, "INVALID_ITEMS", "At least one order item is required.");
  return items.map((item) => {
    assert(mongoose.isValidObjectId(item.foodId || item._id), 422, "INVALID_ITEM_ID", "Invalid product identifier.");
    assert(isPositiveInt(item.quantity), 422, "INVALID_QUANTITY", "Quantity must be a positive integer.");
    return { foodId: item.foodId || item._id, quantity: Number(item.quantity) };
  });
};

export const placeOrder = async (req, res) => {
  assert(stripe, 503, "PAYMENTS_UNAVAILABLE", "Stripe payments are not configured on this environment.");
  const itemsInput = normalizeItems(req.body.items);
  const ids = itemsInput.map((item) => item.foodId);
  const foods = await foodModel.find({ _id: { $in: ids }, active: true }).lean();
  const byId = new Map(foods.map((food) => [food._id.toString(), food]));
  assert(foods.length === ids.length, 409, "ITEM_UNAVAILABLE", "One or more products are no longer available.");

  const items = itemsInput.map((item) => {
    const food = byId.get(item.foodId.toString());
    return { foodId: food._id, name: food.name, price: food.price, quantity: item.quantity };
  });
  const { subtotal, total } = calculateOrderTotals(items, deliveryFee);
  const address = pickAddress(req.body.address);
  assert(Object.values(address).every(Boolean), 422, "INVALID_ADDRESS", "A complete delivery address is required.");

  const order = await orderModel.create({ userId: req.user.id, items, subtotal, deliveryFee, amount: total, address });
  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));
    if (deliveryFee > 0) lineItems.push({
      price_data: { currency, product_data: { name: "Delivery fee" }, unit_amount: Math.round(deliveryFee * 100) },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata: { orderId: order._id.toString(), userId: req.user.id },
      success_url: `${frontendUrl}/payment/${order._id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/payment/${order._id}?cancelled=true`,
    });

    await orderModel.findByIdAndUpdate(order._id, { stripeSessionId: session.id });
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });
    res.status(201).json({ success: true, orderId: order._id, session_url: session.url, total });
  } catch (error) {
    await orderModel.findByIdAndUpdate(order._id, { status: "CANCELLED" });
    throw error;
  }
};

export const paymentStatus = async (req, res) => {
  const order = await orderModel.findOne({ _id: req.params.orderId, userId: req.user.id }).lean();
  assert(order, 404, "ORDER_NOT_FOUND", "Order not found.");
  res.json({ success: true, data: { id: order._id, status: order.status, paymentStatus: order.paymentStatus, amount: order.amount } });
};

export const stripeWebhook = async (req, res) => {
  assert(stripe && process.env.STRIPE_WEBHOOK_SECRET, 503, "WEBHOOKS_UNAVAILABLE", "Stripe webhook verification is not configured.");
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    throw new HttpError(400, "INVALID_STRIPE_SIGNATURE", "Webhook signature verification failed.");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      await orderModel.findByIdAndUpdate(orderId, { paymentStatus: "PAID" });
      logger.info("payment_completed", { orderId, stripeSessionId: session.id });
    }
  }
  if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (orderId) await orderModel.findByIdAndUpdate(orderId, { paymentStatus: "FAILED" });
  }

  res.json({ received: true });
};

export const userOrders = async (req, res) => {
  const orders = await orderModel.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: orders });
};

export const listOrders = async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit || "25", 10), 1), 100);
  const filter = {};
  if (req.query.status && statusValues.includes(req.query.status)) filter.status = req.query.status;
  const [data, total] = await Promise.all([
    orderModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    orderModel.countDocuments(filter),
  ]);
  res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
};

export const updateStatus = async (req, res) => {
  const status = cleanText(req.body.status, 30);
  assert(statusValues.includes(status), 422, "INVALID_STATUS", "Unsupported order status.");
  const order = await orderModel.findByIdAndUpdate(req.params.orderId, { status }, { new: true, runValidators: true });
  assert(order, 404, "ORDER_NOT_FOUND", "Order not found.");
  res.json({ success: true, message: "Order status updated.", data: order });
};

import "dotenv/config";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";

await mongoose.connect(process.env.MONGO_URI);
const foodResult = await foodModel.updateMany({ active: { $exists: false } }, { $set: { active: true } });
const deliveryFee = Number(process.env.DELIVERY_FEE || 2);
const oldOrders = await orderModel.find({ paymentStatus: { $exists: false } }).lean();
for (const order of oldOrders) {
  const oldStatus = order.status;
  const statusMap = { "Food Processing": "PREPARING", "Out for delivery": "OUT_FOR_DELIVERY", Delivered: "DELIVERED" };
  await orderModel.updateOne(
    { _id: order._id },
    {
      $set: {
        paymentStatus: order.payment === true ? "PAID" : "PENDING",
        status: statusMap[oldStatus] || "PLACED",
        deliveryFee,
        subtotal: Math.max(0, Number(order.amount || 0) - deliveryFee),
      },
    }
  );
}
console.log(`Migrated catalog records: ${foodResult.modifiedCount}. Migrated legacy orders: ${oldOrders.length}.`);
await mongoose.disconnect();

import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, max: 50 },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxlength: 80 },
    lastName: { type: String, required: true, maxlength: 80 },
    email: { type: String, required: true, maxlength: 160 },
    street: { type: String, required: true, maxlength: 200 },
    city: { type: String, required: true, maxlength: 100 },
    state: { type: String, required: true, maxlength: 100 },
    country: { type: String, required: true, maxlength: 100 },
    zipcode: { type: String, required: true, maxlength: 20 },
    phone: { type: String, required: true, maxlength: 30 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
    items: { type: [orderItemSchema], required: true, validate: (v) => Array.isArray(v) && v.length > 0 },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
    address: { type: addressSchema, required: true },
    status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
      default: "PLACED",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
      index: true,
    },
    stripeSessionId: { type: String, index: true, sparse: true },
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;

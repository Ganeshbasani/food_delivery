import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    price: { type: Number, required: true, min: 0.01 },
    image: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true, maxlength: 60 },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

foodSchema.index({ name: "text", description: "text", category: "text" });
foodSchema.index({ category: 1, active: 1, createdAt: -1 });

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;

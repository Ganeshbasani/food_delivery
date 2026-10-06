import "dotenv/config";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";

const foods = Array.from({ length: 17 }, (_, i) => ({
  name: ["Greek Garden Salad","Veggie Power Bowl","Clover Salad","Chicken Protein Salad","Lasagna Rolls","Peri Peri Rolls","Chicken Rolls","Veggie Rolls","Ripple Ice Cream","Fruit Ice Cream","Jar Ice Cream","Vanilla Ice Cream","Chicken Sandwich","Vegan Sandwich","Grilled Sandwich","Bread Sandwich","Cup Cake"][i],
  description: "Freshly prepared food made for fast, reliable delivery.",
  price: [12,18,16,24,14,12,20,15,14,22,10,12,12,18,16,24,14][i],
  category: ["Salad","Salad","Salad","Salad","Rolls","Rolls","Rolls","Rolls","Deserts","Deserts","Deserts","Deserts","Sandwich","Sandwich","Sandwich","Sandwich","Cake"][i],
  image: `172286${[5444288,5514626,5628915,5668073,5738489,5934153,5976487,6043779,6109947,6148130,6329894,6385025,6412882,6469319,6504992,6560218,6610567][i]}food_${i + 1}.png`,
}));

await mongoose.connect(process.env.MONGO_URI);
for (const item of foods) {
  await foodModel.updateOne({ name: item.name }, { $set: item }, { upsert: true });
}
console.log(`Seeded ${foods.length} BiteFlow products.`);
await mongoose.disconnect();

// models/Car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  discount: { type: String },
  available: { type: Boolean, default: true },
  promoted: { type: Boolean, default: false },
  features: {
    seats: Number,
    mileage: String,
    fuelType: String,
    year: Number,
    transmission: String
  },
  image: { type: String }, // Thumbnail or primary
  images: [{ type: String }], // Extra images
}, { timestamps: true });

export default mongoose.model("Car", carSchema);

// models/Box.js
import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["ENVELOPE", "BOX"]
  },
  emptyWeight: Number, // lbs
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  maxWeight: Number, // lbs
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });


const UspsBoxModel = mongoose.models.Box || mongoose.model("Box", boxSchema);

export default UspsBoxModel;
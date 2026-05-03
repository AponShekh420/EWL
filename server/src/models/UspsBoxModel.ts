// models/Box.js
import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ["ENVELOPE", "BOX"]
  },
  emptyWeight: {
    type: Number,
    default: 0
  },
  dimensions: {
    length: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  maxWeight: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });


const UspsBoxModel = mongoose.models.Box || mongoose.model("Box", boxSchema);

export default UspsBoxModel;
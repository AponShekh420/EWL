import mongoose, { model, Schema } from "mongoose";
const crypto = require("crypto");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    default: "user.png"
  },
  role: {
    type: String,
    required: true,
    default: "viewer",
    enum: ['admin', 'speaker', "viewer", "customer"],
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ['active', 'pending'],
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  isOrthodoxJew: {
    type: Boolean,
    default: false,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true
  },
  keepsMitzvos: {
    type: Boolean,
    default: false,
    required: true,
  },
  chafifaDuration: {
    type: String,
    required: true
  },
  chickenSoupInDairySink: {
    type: String,
    required: true
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {timestamps: true});



userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 //10mins

  return resetToken
}

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
import { model, Schema } from "mongoose";

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
    default: "http://image.jpg"
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'speaker', "viewer", "customer"],
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
  }
}, {timestamps: true});


const UserModel = model("User", userSchema);

export default UserModel;
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const crypto = require("crypto");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
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
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Course" }],
    classes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Class" }],
    passwordResetToken: String,
    passwordResetExpires: Date,
}, { timestamps: true });
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10mins
    return resetToken;
};
const UserModel = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = UserModel;

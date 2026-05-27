"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// routes
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const courseRouter_1 = __importDefault(require("./routes/e-learning/courseRouter"));
const recordingRouter_1 = __importDefault(require("./routes/e-learning/recordingRouter"));
const ecommerceRouter_1 = __importDefault(require("./routes/ecommerceRouter"));
const paidHotlineSpeakerRouter_1 = __importDefault(require("./routes/paidHotlineSpeakerRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const classRouter_1 = __importDefault(require("./routes/e-learning/classRouter"));
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:3000");
    next();
});
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        process.env.CLIENT_URL || "",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
}));
mongoose_1.default
    .connect(process.env.MONGOOSE_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection failed:", err));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.urlencoded({ extended: true, limit: "5000mb" }));
// app.use(express.json());
app.use((req, res, next) => {
    if ((req.originalUrl === "/api/ecommerce/order/webhook") || (req.originalUrl === "/api/e-learning/class-order/webhook") || (req.originalUrl === "/api/e-learning/order/webhook")) {
        next();
    }
    else {
        express_1.default.json({ limit: "5000mb" })(req, res, next);
    }
});
// e-learning
app.use("/api/e-learning", recordingRouter_1.default);
app.use("/api/e-learning", courseRouter_1.default);
// Authentication
app.use("/api/auth", authRouter_1.default);
app.use("/api/account", userRouter_1.default);
// E-commerce
app.use("/api/ecommerce", ecommerceRouter_1.default);
app.use("/api/blog", blogRouter_1.default);
// Paid speaker
app.use("/api/paid-hotline", paidHotlineSpeakerRouter_1.default);
// e-learning
app.use("/api/e-learning", courseRouter_1.default);
app.use("/api/e-learning", classRouter_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Welcome to the home page" });
});
//global error handler for every request
app.use(errorMiddleware_1.notFoundHandler);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
exports.default = app;

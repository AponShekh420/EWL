import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";

// routes
import authRouter from "./routes/authRouter";
import ecommerceRouter from "./routes/ecommerceRouter";

dotenv.config();

const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.CLIENT_URL || "",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

mongoose
  .connect(process.env.MONGOOSE_URL as string)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true, limit: "5000mb" }));
app.use(express.json({ limit: "5000mb" }));

// Authentication
app.use("/api/auth", authRouter);
app.use("/api/ecommerce", ecommerceRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "Welcome to the home page" });
});
//global error handler for every request
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

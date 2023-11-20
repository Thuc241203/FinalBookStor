import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import profileRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import feedbackRouter from "./routes/feedback.js";
import sliderRouter from "./routes/slider.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URL);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", profileRouter);
app.use("/api", orderRouter);
app.use("/api", feedbackRouter);
app.use("/api", sliderRouter);

app.listen(PORT, () => {
  console.log(`>>>Server started on port ${PORT}`);
});

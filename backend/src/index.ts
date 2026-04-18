import express from "express";
import productRouter from "./routes/product.routes";
import authRouter from "./routes/auth.routes";
import orderRouter from "./routes/order.routes";
import { errorHandler } from "./middleware/error.middleware";
import uploadRouter from "./routes/upload.routes";
import cors from "cors";
import paymentRouter from "./routes/payment.routes";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use("/payment/webhook", express.raw({ type: "application/octet-stream" }));

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3001",
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/upload", uploadRouter);
app.use("/payment", paymentRouter);

app.get("/health", async (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

import type { Request, NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../services/product.service";
import {
  createCheckoutSession,
  handleWebhook,
} from "../services/payment.service";

export const createSession = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.body;

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: req.userId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      res.status(400).json({ error: "Order not found" });
      return;
    }

    const url = await createCheckoutSession(
      orderId,
      order.items.map((item) => ({
        name: item.product.name,
        price: item.price,
        quantity: item.quantity,
      })),
    );
    res.json({ url });
  } catch (err) {
    next(err);
  }
};

export const webhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const signature = req.headers["stripe-signature"] as string;
    await handleWebhook(req.body, signature);
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};

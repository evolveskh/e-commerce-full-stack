import type { AuthRequest } from "../middleware/auth.middleware";
import type { Response } from "express";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../validators/order.validator";
import * as OrderService from "../services/order.service";

export const create = async (req: AuthRequest, res: Response) => {
  const result = createOrderSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const order = await OrderService.createOrder(
    req.userId as string,
    result.data,
  );
  res.status(201).json(order);
};

export const getAll = async (req: AuthRequest, res: Response) => {
  const orders = await OrderService.getUserOrders(req.userId as string);
  res.json(orders);
};

export const getOne = async (req: AuthRequest, res: Response) => {
  const order = await OrderService.getOrderById(
    req.params.id as string,
    req.userId as string,
  );
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
};

export const updateStatus = async (req: AuthRequest, res: Response) => {
  const result = updateOrderStatusSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const order = await OrderService.updateOrderStatus(
    req.params.id as string,
    result.data,
  );
  res.json(order);
};

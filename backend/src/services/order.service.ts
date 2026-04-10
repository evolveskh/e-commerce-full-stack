import { prisma } from "./product.service";
import type {
  CreateOrderInput,
  UpdateOrderStatusInput,
} from "../validators/order.validator";

export const createOrder = async (userId: string, data: CreateOrderInput) => {
  const products = await prisma.product.findMany({
    where: { id: { in: data.items.map((i) => i.productId) } },
  });

  const total = data.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    return sum + product.price * item.quantity;
  }, 0);

  return prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: products.find((p) => p.id === item.productId)!.price,
        })),
      },
    },
  });
};

export const getUserOrders = (userId: string) =>
  prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

export const getOrderById = (id: string, userId: string) =>
  prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

export const updateOrderStatus = (id: string, data: UpdateOrderStatusInput) =>
  prisma.order.update({
    where: { id },
    data: { status: data.status },
  });

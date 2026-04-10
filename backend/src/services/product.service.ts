import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../validators/product.validator";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

export const getAllProducts = () => prisma.product.findMany();

export const getProductById = (id: string) =>
  prisma.product.findUnique({ where: { id } });

export const createProduct = (data: CreateProductInput) =>
  prisma.product.create({ data });

export const updateProduct = (id: string, data: UpdateProductInput) =>
  prisma.product.update({ where: { id }, data });

export const deleteProduct = (id: string) =>
  prisma.product.delete({ where: { id } });

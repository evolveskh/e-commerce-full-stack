import type { NextFunction, Request, Response } from "express";
import * as ProductService from "../services/product.service";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await ProductService.getProductById(
      req.params.id as string,
    );

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = createProductSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten() });
    }
    const product = await ProductService.createProduct(result.data!);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = updateProductSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten() });
    }
    const product = await ProductService.updateProduct(
      req.params.id as string,
      result.data!,
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await ProductService.deleteProduct(req.params.id as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

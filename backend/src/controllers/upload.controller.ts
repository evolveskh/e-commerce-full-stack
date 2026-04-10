import type { AuthRequest } from "../middleware/auth.middleware";
import type { NextFunction, Response } from "express";
import { uploadImage } from "../services/upload.service";

export const uploadProductImage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }
    const url = await uploadImage(req.file.buffer, "products");
    res.json({ url });
  } catch (err) {
    next(err);
  }
};

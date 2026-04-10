import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  try {
    const user = await AuthService.register(result.data);
    res.status(201).json(user);
  } catch {
    res.status(409).json({ error: "Email already in use" });
  }
};

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const { token } = await AuthService.login(result.data);
  res.json({ token });
};

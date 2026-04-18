import { Router } from "express";
import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createSession, webhook } from "../controllers/payment.controller";

const router = Router();

router.post(
  "/webhook",
  express.raw({ type: "application/octet-stream" }),
  webhook,
);
router.post("/create-session", authenticate, createSession);

export default router;

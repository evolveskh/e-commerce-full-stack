import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import * as OrderController from "../controllers/order.controller";
const router = Router();

router.use(authenticate);

router.post("/", OrderController.create);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getOne);
router.patch("/:id/status", OrderController.updateStatus);

export default router;

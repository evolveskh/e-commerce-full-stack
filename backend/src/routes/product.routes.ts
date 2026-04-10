import { Router } from "express";
import * as ProductController from "../controllers/product.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.post("/", authenticate, ProductController.create);
router.put("/:id", authenticate, ProductController.update);
router.delete("/:id", authenticate, ProductController.remove);

export default router;

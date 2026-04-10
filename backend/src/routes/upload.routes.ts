import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { uploadProductImage } from "../controllers/upload.controller";

const router = Router();

router.post(
  "/product",
  authenticate,
  upload.single("image"),
  uploadProductImage,
);

export default router;

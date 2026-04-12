import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  checkEmailAvailability,
  syncInitialProfile,
  syncProfile,
} from "../controllers/auth.controller";

const router = Router();

// Route: POST http://localhost:5000/api/auth/sync
// Mục đích: Đồng bộ thông tin từ Supabase Auth sang bảng Profile của mình
router.post("/sync", authMiddleware, syncProfile);
router.post("/check-email", checkEmailAvailability);
router.post("/sync-initial", authMiddleware, syncInitialProfile);

export default router;

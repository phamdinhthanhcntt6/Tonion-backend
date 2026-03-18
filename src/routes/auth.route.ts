import { Router } from "express";
import { syncProfile } from "../controllers/auth.controller";
import authMiddleware from "@/middlewares/auth.middleware";

const router = Router();

// Route: POST http://localhost:5000/api/auth/sync
// Mục đích: Đồng bộ thông tin từ Supabase Auth sang bảng Profile của mình
router.post("/sync", authMiddleware, syncProfile);

export default router;

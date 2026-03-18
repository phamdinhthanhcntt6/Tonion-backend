"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Route: POST http://localhost:5000/api/auth/sync
// Mục đích: Đồng bộ thông tin từ Supabase Auth sang bảng Profile của mình
// router.post("/sync", authMiddleware, syncProfile);
router.post("/sync", auth_controller_1.syncProfile);
exports.default = router;

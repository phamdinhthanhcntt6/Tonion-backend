"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // 1. Kiểm tra cấu trúc Header Authorization
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Unauthorized",
                detail: "Missing or invalid token format",
            });
        }
        const token = authHeader.split(" ")[1];
        // 2. Lấy Public Key và xử lý dấu xuống dòng (\n)
        const publicKey = process.env.SUPABASE_PUBLIC_KEY;
        if (!publicKey) {
            console.error("❌ CRITICAL: SUPABASE_PUBLIC_KEY is not defined in .env");
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // Chuyển chuỗi từ .env thành định dạng PEM chuẩn
        const formattedKey = publicKey.replace(/\\n/g, "\n");
        // 3. Giải mã với thuật toán ES256
        // Lưu ý: algorithms phải là một mảng ['ES256']
        const decoded = jsonwebtoken_1.default.verify(token, formattedKey, {
            algorithms: ["ES256"],
        });
        // Gán dữ liệu user đã giải mã vào request
        req.user = decoded;
        next();
    }
    catch (error) {
        // Log lỗi chi tiết ra Terminal để bạn dễ "bắt bệnh"
        console.error("❌ Auth Error:", error.message);
        // Trả về lỗi rõ ràng cho Frontend
        const message = error.message === "jwt expired" ? "Session expired" : "Invalid token";
        return res.status(401).json({
            error: "Unauthorized",
            detail: message,
        });
    }
};
exports.default = authMiddleware;

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Chuyển chuỗi từ .env thành định dạng PEM chuẩn
    const formattedKey = publicKey.replace(/\\n/g, "\n");

    // 3. Giải mã với thuật toán ES256
    // Lưu ý: algorithms phải là một mảng ['ES256']
    const decoded = jwt.verify(token, formattedKey, {
      algorithms: ["ES256"],
    });

    // Gán dữ liệu user đã giải mã vào request
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    // Log lỗi chi tiết ra Terminal để bạn dễ "bắt bệnh"
    console.error("❌ Auth Error:", error.message);

    // Trả về lỗi rõ ràng cho Frontend
    const message =
      error.message === "jwt expired" ? "Session expired" : "Invalid token";
    return res.status(401).json({
      error: "Unauthorized",
      detail: message,
    });
  }
};

export default authMiddleware;

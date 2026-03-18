import { Request, Response } from "express";
import prisma from "../config/prisma";

export const syncProfile = async (req: Request, res: Response) => {
  try {
    // Lấy thông tin từ Token (do authMiddleware giải mã)
    const userAuth = (req as any).user;

    if (!userAuth) {
      return res
        .status(401)
        .json({ message: "Không tìm thấy thông tin xác thực" });
    }

    const profile = await prisma.profile.upsert({
      where: { id: userAuth.sub }, // 'sub' là ID duy nhất của user trong Supabase
      update: {
        email: userAuth.email,
      },
      create: {
        id: userAuth.sub,
        email: userAuth.email,
        fullName: userAuth.user_metadata?.full_name || "Người dùng mới",
        role: "USER",
      },
    });

    res
      .status(200)
      .json({ message: "Đồng bộ an toàn thành công!", data: profile });
  } catch (error) {
    console.error("❌ Lỗi sync:", error);
    res.status(500).json({ message: "Lỗi đồng bộ dữ liệu" });
  }
};

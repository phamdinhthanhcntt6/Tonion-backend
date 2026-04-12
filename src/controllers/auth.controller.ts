import { ROLE } from "@/constants/role";
import { Request, Response } from "express";
import prisma from "../config/prisma";

// BƯỚC 1: Chỉ kiểm tra email có trống không
export const checkEmailAvailability = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const existingUser = await prisma.profile.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "Email này đã được sử dụng. Vui lòng dùng email khác.",
      });
    }

    return res.status(200).json({ message: "Email khả dụng." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// BƯỚC 2: Đồng bộ sau khi đã Sign Up thành công ở Frontend
export const syncProfile = async (req: Request, res: Response) => {
  try {
    const userAuth = (req as any).user; // Lấy từ authMiddleware (Token ES256)

    if (!userAuth) return res.status(401).json({ message: "Unauthorized" });

    const profile = await prisma.profile.upsert({
      where: { id: userAuth.sub },
      update: { email: userAuth.email },
      create: {
        id: userAuth.sub,
        email: userAuth.email,
        fullName:
          userAuth.user_metadata?.full_name || userAuth.email.split("@")[0],
        role: ROLE.USER,
        // isCompleted: false, // Bạn nên thêm trường này vào Prisma để biết user chưa xong bước 3
      },
    });

    res.status(200).json({ data: profile });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const syncInitialProfile = async (req: Request, res: Response) => {
  try {
    const userAuth = (req as any).user;

    if (!userAuth) return res.status(401).json({ message: "Unauthorized" });

    const profile = await prisma.profile.upsert({
      where: { id: userAuth.sub },
      update: { email: userAuth.email },
      create: {
        id: userAuth.sub,
        email: userAuth.email,
        fullName:
          userAuth.user_metadata?.full_name || userAuth.email.split("@")[0],
        role: ROLE.USER,
      },
    });

    res.status(200).json({ data: profile });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

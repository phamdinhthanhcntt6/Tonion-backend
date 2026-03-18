import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import authRoutes from "./routes";
// import authRoutes from './routes/auth.routes'; // Chúng ta sẽ tạo ở bước sau

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors()); // Cho phép Frontend gọi API từ domain khác
app.use(express.json()); // Cho phép Server đọc dữ liệu JSON từ request body

// Route kiểm tra sức khỏe của Server
app.get("/", (req: Request, res: Response) => {
  res.send("MUVIBE API is running...");
});

// Đăng ký các Routes chính (Sẽ thêm dần vào đây)
app.use("/api", authRoutes);

export default app;

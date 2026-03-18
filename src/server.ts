import "dotenv/config";
import app from "./app";

// THÊM DÒNG NÀY ĐỂ KIỂM TRA:
console.log(
  "🔑 Kiểm tra KEY trong server.ts:",
  process.env.SUPABASE_PUBLIC_KEY ? "Đã nhận ✅" : "Vẫn trống ❌",
);

const PORT = process.env.PORT || 5000;

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khởi động server:", error);
    process.exit(1);
  }
};

startServer();

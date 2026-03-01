import { defineConfig } from "@prisma/config";
import "dotenv/config";

export default defineConfig({
  // Chỉ đường dẫn đến file schema của bạn
  schema: "./prisma/schema.prisma",
  datasource: {
    // Prisma 7 sẽ đọc DATABASE_URL từ file .env thông qua đây
    url: process.env.DATABASE_URL,
  },
});

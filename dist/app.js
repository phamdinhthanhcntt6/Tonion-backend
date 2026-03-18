"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
// import authRoutes from './routes/auth.routes'; // Chúng ta sẽ tạo ở bước sau
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)()); // Cho phép Frontend gọi API từ domain khác
app.use(express_1.default.json()); // Cho phép Server đọc dữ liệu JSON từ request body
// Route kiểm tra sức khỏe của Server
app.get("/", (req, res) => {
    res.send("MUVIBE API is running...");
});
// Đăng ký các Routes chính (Sẽ thêm dần vào đây)
app.use("/api", routes_1.default);
exports.default = app;

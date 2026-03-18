import { Router } from "express";
import authRoutes from "./auth.route";

const rootRouter = Router();

// Tất cả các route trong authRoutes sẽ bắt đầu bằng /auth
rootRouter.use("/auth", authRoutes);

export default rootRouter;

import express from "express";
import ResponseHandler from "../utils/responseHandler.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import taskRoutes from "./task.routes.js";
const router = express.Router();

router.get("/", (req, res) => {
  return ResponseHandler.sendSuccessResponse(
    res,
    null,
    "Task Manager Main router API",
    200,
  );
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;

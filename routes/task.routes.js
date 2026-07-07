import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import TaskController from "../controllers/task.controller.js";
const router = express.Router();

router.get("/", verifyToken, TaskController.getTasks);
router.post("/", verifyToken, TaskController.createTask);
router.patch("/:id", verifyToken, TaskController.updateTask);
router.delete("/:id", verifyToken, TaskController.deleteTask);

export default router;

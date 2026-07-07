import Task from "../models/task.js";
import ResponseHandler from "../utils/responseHandler.js";
import mongoose from "mongoose";
class TaskController {
  static async createTask(req, res) {
    try {
      const { title, description, status, priority, dueDate } = req.body;

      if (!title) {
        return ResponseHandler.sendErrorResponse(
          res,
          "Task title is required",
          400,
        );
      }

      const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate: dueDate || null,
        userId: req.user.id,
      });

      return ResponseHandler.sendSuccessResponse(
        res,
        task,
        "Task created successfully",
        201,
      );
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error.message, 500);
    }
  }

  static async getTasks(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

      const limit = Math.min(
        Math.max(parseInt(req.query.limit, 10) || 10, 1),
        50,
      );

      const skip = (page - 1) * limit;

      const status = (req.query.status || "all").toLowerCase();
      const search = (req.query.search || "").trim();

      const filter = {
        userId: req.user.id,
      };

      if (status !== "all") {
        filter.status = status;
      }

      if (search) {
        if (mongoose.Types.ObjectId.isValid(search)) {
          filter._id = search;
        } else {
          filter.$or = [
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
          ];
        }
      }

      const [tasks, total] = await Promise.all([
        Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

        Task.countDocuments(filter),
      ]);

      return ResponseHandler.sendSuccessResponse(
        res,
        {
          tasks,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.max(Math.ceil(total / limit), 1),
          },
        },
        "Tasks fetched successfully",
        200,
      );
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error.message, 500);
    }
  }

  static async updateTask(req, res) {
    try {
      const { title, description, status, priority, dueDate } = req.body;

      const task = await Task.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!task) {
        return ResponseHandler.sendErrorResponse(res, "Task not found", 404);
      }

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (priority !== undefined) task.priority = priority;
      if (dueDate !== undefined) task.dueDate = dueDate || null;

      await task.save();

      return ResponseHandler.sendSuccessResponse(
        res,
        task,
        "Task updated successfully",
        200,
      );
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error.message, 500);
    }
  }

  static async deleteTask(req, res) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!task) {
        return ResponseHandler.sendErrorResponse(res, "Task not found", 404);
      }

      return ResponseHandler.sendSuccessResponse(
        res,
        null,
        "Task deleted successfully",
        200,
      );
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error.message, 500);
    }
  }
}

export default TaskController;

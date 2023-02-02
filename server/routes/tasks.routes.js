import { Router } from "express";
import { getTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/", getTasks)

router.get("/:id", getTask)

router.post("/", createTask)

router.put("/:id", updateTask)

router.delete("/:id", deleteTask)

export default router;  
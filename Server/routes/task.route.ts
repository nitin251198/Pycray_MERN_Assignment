import express, { Router, Request, Response } from 'express';
import authenticate from '../controller/middleware';
import {deleteTask, getTasks, postTask, putTask} from '../controller/task.controller'

const router: Router = express.Router();
// Routes beginning with /api/tasks
router.get("/gettasks", authenticate, getTasks);
//router.get("/get-all-tasks",authenticate, getAllTask);
router.post("/addTask", authenticate, postTask);
router.put("/:taskId", authenticate, putTask);
router.delete("/:taskId", authenticate, deleteTask);

export default router;
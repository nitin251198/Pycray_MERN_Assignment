"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../controller/middleware"));
const task_controller_1 = require("../controller/task.controller");
const router = express_1.default.Router();
// Routes beginning with /api/tasks
router.get("/gettasks", middleware_1.default, task_controller_1.getTasks);
//router.get("/get-all-tasks",authenticate, getAllTask);
router.post("/addTask", middleware_1.default, task_controller_1.postTask);
router.put("/:taskId", middleware_1.default, task_controller_1.putTask);
router.delete("/:taskId", middleware_1.default, task_controller_1.deleteTask);
exports.default = router;

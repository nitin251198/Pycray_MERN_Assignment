"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTask = exports.getTasks = exports.deleteTask = exports.postTask = void 0;
const Task_1 = __importDefault(require("../db/schema/Task"));
const validation_1 = require("../utils/validation");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.user.id;
        console.log(id);
        const data = yield Task_1.default.find({ user: id });
        res.status(200).send({
            data,
            status: true,
            message: "Tasks get successfully.."
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).send({
            status: false,
            message: err.message
        });
    }
});
exports.getTasks = getTasks;
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Task_1.default.find();
        res.status(200).send({
            data,
            status: true,
            message: "Task found successfully.."
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).send({
            status: false,
            message: err.message
        });
    }
});
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, title, priority, status, dueDate } = req.body;
        if (!title) {
            return res.status(400).send({
                status: false,
                message: "Title of task can't be empty"
            });
        }
        const data = yield Task_1.default.create({
            user: req.user.id,
            description,
            title,
            priority,
            status,
            dueDate
        });
        res.status(200).send({
            data,
            status: true,
            message: "Task created successfully.."
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).send({
            status: false,
            message: err.message
        });
    }
});
exports.postTask = postTask;
const putTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, title, priority, status, dueDate } = req.body;
        if (!(0, validation_1.validateObjectId)(req.params.taskId)) {
            return res.status(400).send({
                status: false,
                message: "Task id not valid"
            });
        }
        if (!title) {
            return res.status(400).send({
                status: false,
                message: "Title of task not found"
            });
        }
        let data = yield Task_1.default.findById(req.params.taskId).lean();
        if (!data) {
            return res.status(400).send({
                status: false,
                message: "Task with given id not found"
            });
        }
        if (data.user != req.user.id) {
            return res.status(403).send({
                status: false,
                message: "You can't update a task of another user"
            });
        }
        data = yield Task_1.default.findByIdAndUpdate(req.params.taskId, { description, title, priority, status, dueDate }, { new: true });
        res.status(200).send({
            data,
            status: true,
            message: "Task updated successfully.."
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).send({
            status: false,
            message: err.message
        });
    }
});
exports.putTask = putTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, validation_1.validateObjectId)(req.params.taskId)) {
            return res.status(400).send({
                status: false,
                message: "Task id not valid"
            });
        }
        let data = yield Task_1.default.findById(req.params.taskId).lean();
        if (!data) {
            return res.status(400).send({
                status: false,
                message: "Task with given id not found"
            });
        }
        if (data.user != req.user.id) {
            return res.status(403).send({
                status: false,
                message: "You can't delete task of another user"
            });
        }
        yield Task_1.default.findByIdAndDelete(req.params.taskId);
        res.status(200).send({
            status: true,
            message: "Task deleted successfully.."
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).send({
            status: false,
            message: err.message
        });
    }
});
exports.deleteTask = deleteTask;

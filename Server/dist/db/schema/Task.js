"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    user: String,
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'high' },
    status: { type: String, enum: ['pending', 'completed', 'expired'], default: 'pending' },
    dueDate: Date,
});
exports.default = mongoose_1.default.model('Task', taskSchema);


import mongoose, { Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  user: string;
  description: string;
  priority: string;
  status: string;
  dueDate: Date;
}

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: String,
  priority: { type: String, enum: ['low', 'medium','high'], default: 'high' },
  status: { type: String, enum: ['pending', 'completed','expired'], default: 'pending' },
  dueDate: Date,
});

export default mongoose.model<Task>('Task', taskSchema);

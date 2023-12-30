
import mongoose, { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model<User>('User', userSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema({
  username: String,
  password: String,
});

export default mongoose.model<IUser>('User', userSchema);

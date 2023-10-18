// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//   password: string;
//   email: string;
// }

// const UserSchema = new Schema<IUser>({
//   password: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
// });

// export const User = mongoose.model<IUser>('User', UserSchema);

// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  _id: string; // Define the _id field in the interface
  password: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  _id: { type: String, default: uuidv4 }, // Include _id in the schema
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);


import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  userId: string;
}

const noteSchema = new Schema({
  title: String,
  content: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model<INote>('Note', noteSchema);

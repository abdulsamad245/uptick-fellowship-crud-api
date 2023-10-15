import mongoose, { Document } from 'mongoose';
export interface INote extends Document {
    title: string;
    content: string;
    userId: string;
}
declare const _default: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote> & INote & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;

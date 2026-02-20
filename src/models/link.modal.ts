import mongoose, { Schema } from "mongoose";

export interface ILink extends Document {
  userId: mongoose.Types.ObjectId;
  originalUrl: string;
  alias: string;
  clickCount: number;
}

const linkSchema = new Schema<ILink>({
  userId: Schema.ObjectId,
  originalUrl: { type: String, required: true },
  alias: { type: String, required: true, unique: true },
  clickCount: { type: Number, default: 0 },
});

export const LinkModel = mongoose.model<ILink>("Link", linkSchema);

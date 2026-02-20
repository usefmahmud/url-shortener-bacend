import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema({
  userId: Schema.ObjectId,
  originalUrl: { type: String, required: true },
  alias: { type: String, required: true, unique: true },
  clickCount: { type: Number, default: 0 },
});

export const LinkModel = mongoose.model("Link", linkSchema);

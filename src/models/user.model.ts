import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);

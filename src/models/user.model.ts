import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);

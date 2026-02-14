import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { error, success } from "../utils/response";
import { RegisterSchema } from "../schema/auth.schema";
import { zValidator } from "@hono/zod-validator";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";

export const authRoute = new Hono();

authRoute.post(
  "/register",
  zValidator("json", RegisterSchema, (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return error(c, "Validation failed", 400, errors);
    }
  }),
  async (c) => {
    const { email, password } = await c.req.valid("json");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return error(c, "Email already in use", 400);
    }

    const userId = uuidv7();
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      id: userId,
      email,
      passwordHash,
    });

    try {
      await newUser.save();

      return success(c, { message: "Registered successfully" });
    } catch (err) {
      return error(c, "Failed to register user", 500);
    }
  },
);

authRoute.post("/login", (c) => {
  return success(c, { message: "Logged in successfully" });
});

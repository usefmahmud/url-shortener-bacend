import { Env, Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { error, success } from "../utils/response";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { Hook, zValidator } from "@hono/zod-validator";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";
import { Context } from "hono";
import { validationHook } from "../utils/validators";
import { CONFIG } from "../config";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

export const authRoute = new Hono();

authRoute.post(
  "/register",
  zValidator("json", RegisterSchema, validationHook),
  async (c) => {
    const { email, password } = await c.req.valid("json");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return error(c, "Email already in use", 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
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

authRoute.post(
  "/login",
  zValidator("json", LoginSchema, validationHook),
  async (c) => {
    const { email, password } = await c.req.valid("json");

    const user = await User.findOne({ email });

    if (!user) {
      return error(c, "Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return error(c, "Invalid email or password", 401);
    }

    const payload = {
      userId: user._id,
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes
    };
    const accessToken = await sign(
      payload,
      CONFIG.getJWTAccessTokenSecret(),
      "HS256",
    );

    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });

    return success(c, { message: "Logged in successfully" });
  },
);

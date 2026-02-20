import { Hono } from "hono";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import { zValidator } from "@hono/zod-validator";
import { validationHook } from "../utils/validators";
import { authController } from "../controllers/auth.controller";

export const authRoute = new Hono();

authRoute.post(
  "/register",
  zValidator("json", RegisterSchema, validationHook),
  authController.register,
);

authRoute.post(
  "/login",
  zValidator("json", LoginSchema, validationHook),
  authController.login,
);

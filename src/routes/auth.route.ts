import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { success } from "../utils/response";

export const authRoute = new Hono();

authRoute.use(authMiddleware);

authRoute.post("/login", (c) => {
  return success(c, { message: "Logged in successfully" });
});

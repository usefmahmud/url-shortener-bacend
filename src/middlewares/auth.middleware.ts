import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { CONFIG } from "../config";
import { error } from "../utils/response";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, "accessToken");

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  try {
    const payload = await verify(
      token,
      CONFIG.getJWTAccessTokenSecret(),
      "HS256",
    );

    c.set("userId", payload);

    await next();
  } catch {
    return error(c, "Invalid token", 401);
  }
};

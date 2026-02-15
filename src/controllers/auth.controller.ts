import { Context } from "hono";
import { authService } from "../services/auth.service";
import { error, success } from "../utils/response";
import { setCookie } from "hono/cookie";
import { LoginInput, RegisterInput } from "../schema/auth.schema";
import { JsonContext } from "../utils/validators";

export class AuthController {
  async register(c: JsonContext<RegisterInput>) {
    const { email, password } = c.req.valid("json");

    try {
      const newUser = await authService.registerUser(email, password);

      if (!newUser) {
        return error(c, "Email already in use", 400);
      }

      return success(c, { message: "Registered successfully" });
    } catch (err) {
      return error(c, "Failed to register user", 500);
    }
  }

  async login(c: JsonContext<LoginInput>) {
    const { email, password } = c.req.valid("json");

    const user = await authService.authenticateUser(email, password);

    if (!user) {
      return error(c, "Invalid email or password", 401);
    }

    const accessToken = await authService.generateAccessToken(
      user._id.toString(),
    );

    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
    });

    return success(c, { message: "Logged in successfully" });
  }
}

export const authController = new AuthController();

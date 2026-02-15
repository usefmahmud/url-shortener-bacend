import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { CONFIG } from "../config";

export class AuthService {
  async registerUser(email: string, password: string) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return null;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      passwordHash,
    });

    await newUser.save();
    return newUser;
  }

  async authenticateUser(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async generateAccessToken(userId: string) {
    const payload = {
      userId,
      exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes
    };

    const accessToken = await sign(
      payload,
      CONFIG.getJWTAccessTokenSecret(),
      "HS256",
    );

    return accessToken;
  }
}

export const authService = new AuthService();

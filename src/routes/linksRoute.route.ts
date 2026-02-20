import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { linksController } from "../controllers/links.controller";
import { validationHook } from "../utils/validators";
import { zValidator } from "@hono/zod-validator";
import { linkCreateSchema } from "../schema/links.schema";

export const linksRoute = new Hono();

linksRoute.use(authMiddleware);

linksRoute.post(
  "/",
  zValidator("json", linkCreateSchema, validationHook),
  linksController.createShortUrl,
);

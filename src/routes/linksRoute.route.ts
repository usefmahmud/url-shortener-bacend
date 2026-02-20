import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { linksController } from "../controllers/links.controller";
import { validationHook } from "../utils/validators";
import { zValidator } from "@hono/zod-validator";
import { linkCreateSchema, linkGetSchema } from "../schema/links.schema";

export const linksRoute = new Hono();

linksRoute.post(
  "/",
  authMiddleware,
  zValidator("json", linkCreateSchema, validationHook),
  linksController.createShortUrl,
);

linksRoute.get(
  "/:alias",
  zValidator("param", linkGetSchema, validationHook),
  linksController.getOriginalUrl,
);

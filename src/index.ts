import { Hono } from "hono";
import { ZodError } from "zod";
import { statsRoute } from "./routes/stats.route";
import { authRoute } from "./routes/auth.route";

const app = new Hono();

app.get("/", (c) => {
  return c.text("URL Shortener API is running!");
});

app.route("/auth", authRoute);

app.route("/stats", statsRoute);

export default app;

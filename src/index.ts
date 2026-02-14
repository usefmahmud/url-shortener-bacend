import { Hono } from "hono";
import { statsRoute } from "./routes/stats.route";

const app = new Hono();

app.get("/", (c) => {
  return c.text("URL Shortener API is running!");
});

app.route("/stats", statsRoute);

export default app;

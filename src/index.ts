import { Hono } from "hono";
import { statsRoute } from "./routes/stats.route";
import { authRoute } from "./routes/auth.route";
import { connectDB } from "./db/connect";
import { linksRoute } from "./routes/linksRoute.route";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = new Hono();
connectDB();

app.get("/", (c) => {
  return c.text("URL Shortener API is running!");
});

app.route("/auth", authRoute);
app.route("/links", linksRoute);
app.route("/stats", statsRoute);

export default app;

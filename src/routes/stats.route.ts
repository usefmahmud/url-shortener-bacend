import { Hono } from "hono";

export const statsRoute = new Hono();

statsRoute.get("/:id", (c) => {
  const id = c.req.param("id");

  return c.json({
    id,
    totalUrls: 100,
    totalClicks: 500,
  });
});

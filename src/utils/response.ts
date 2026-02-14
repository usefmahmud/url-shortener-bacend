import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const success = (
  c: Context,
  data: unknown = {},
  status: ContentfulStatusCode = 200,
) => {
  return c.json({ status: "success", data }, status);
};

export const error = (
  c: Context,
  message: string,
  status: ContentfulStatusCode = 500,
) => {
  return c.json({ status: "error", message }, status);
};

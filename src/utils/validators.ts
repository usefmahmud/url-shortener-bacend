import { Hook } from "@hono/zod-validator";
import { Env } from "hono";
import { error } from "./response";

export const validationHook: Hook<any, Env, any> = (result, c) => {
  if (!result.success) {
    const errors = result.error!.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return error(c, "Validation failed", 400, errors);
  }
};

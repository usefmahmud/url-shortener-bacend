import { z } from "@hono/zod-openapi";

export const linkCreateSchema = z.object({
  originalUrl: z
    .string()
    .url("Invalid URL format")
    .openapi({ example: "https://www.example.com" }),
  alias: z
    .string()
    .min(3, "Alias must be at least 3 characters")
    .max(20, "Alias must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Alias can only contain letters, numbers, underscores, and hyphens",
    )
    .optional()
    .openapi({ example: "my-short-link" }),
});

export type LinkCreateInput = z.infer<typeof linkCreateSchema>;

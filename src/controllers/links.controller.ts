import { LinkCreateInput, LinkGetInput } from "../schema/links.schema";
import { linksService } from "../services/links.service";
import { AuthJsonContext } from "../utils/validators";

export class LinksController {
  async createShortUrl(c: AuthJsonContext<LinkCreateInput>) {
    const user = c.get("user");
    const { originalUrl, alias } = c.req.valid("json");

    try {
      const newLink = await linksService.createShortUrl(
        user.userId,
        originalUrl,
        alias,
      );

      console.log(newLink);

      return c.json({
        message: "Short URL created successfully!",
        link: newLink,
      });
    } catch {
      return c.json({ message: "Failed to create short URL" }, 500);
    }
  }

  async getOriginalUrl(c: AuthJsonContext<LinkGetInput>) {
    const { alias } = c.req.valid("param");
    console.log("Received alias:", alias);

    try {
      const originalUrl = await linksService.getOriginalUrl(alias);

      if (!originalUrl) {
        return c.json({ message: "Alias not found" }, 404);
      }

      return c.json({ originalUrl });
    } catch {
      return c.json({ message: "Failed to retrieve original URL" }, 500);
    }
  }
}

export const linksController = new LinksController();

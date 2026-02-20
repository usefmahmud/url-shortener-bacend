import { getRedisClient } from "../db/redis";
import { LinkModel } from "../models/link.modal";
import { generateAlias } from "../utils/links";

export class LinksService {
  async createShortUrl(userId: string, originalUrl: string, alias?: string) {
    alias ??= generateAlias();

    const existingLink = await LinkModel.findOne({ alias });

    if (existingLink) {
      throw new Error("Alias already exists. Please choose a different one.");
    }

    const newLink = new LinkModel({
      originalUrl,
      alias,
      userId,
    });

    await newLink.save();

    getRedisClient().set(alias, originalUrl, {
      expiration: {
        type: "EX",
        value: 60 * 60 * 24, // 24 hours
      },
    });

    return newLink;
  }
}

export const linksService = new LinksService();

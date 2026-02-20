import { createClient } from "redis";
import { CONFIG } from "../config";

const redisClient = createClient({
  username: CONFIG.getRedisConfig().username,
  password: CONFIG.getRedisConfig().password,
  socket: {
    host: CONFIG.getRedisConfig().host,
    port: CONFIG.getRedisConfig().port,
  },
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis successfully!");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
};

export const getRedisClient = () => {
  if (!redisClient.isOpen) {
    throw new Error("Redis client is not connected");
  }
  return redisClient;
};

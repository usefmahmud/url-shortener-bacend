export const CONFIG = {
  getJWTAccessTokenSecret: () => {
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new Error("JWT_ACCESS_TOKEN_SECRET is not defined");
    }

    return secret;
  },

  getJWTRefreshTokenSecret: () => {
    const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    if (!secret) {
      throw new Error("JWT_REFRESH_TOKEN_SECRET is not defined");
    }

    return secret;
  },

  getJWTAccessTokenExpiration: () => {
    const expiration = process.env.JWT_ACCESS_TOKEN_EXPIRATION;
    if (!expiration) {
      throw new Error("JWT_ACCESS_TOKEN_EXPIRATION is not defined");
    }

    return expiration;
  },

  getJWTRefreshTokenExpiration: () => {
    const expiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION;
    if (!expiration) {
      throw new Error("JWT_REFRESH_TOKEN_EXPIRATION is not defined");
    }

    return expiration;
  },

  getMongoDBURI: () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }

    return uri;
  },

  getRedisConfig: () => {
    const host = process.env.REDIS_HOST;
    const port = process.env.REDIS_PORT;
    const username = process.env.REDIS_USERNAME;
    const password = process.env.REDIS_PASSWORD;

    if (!host || !port || !username || !password) {
      throw new Error(
        "REDIS_HOST, REDIS_PORT, REDIS_USERNAME, and REDIS_PASSWORD must be defined",
      );
    }

    return {
      host,
      port: parseInt(port),
      username,
      password,
    };
  },
};

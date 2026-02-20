import { customAlphabet } from "nanoid";

export const generateAlias = (length: number = 6): string => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const aliasGenerator = customAlphabet(characters, length);

  return aliasGenerator();
};

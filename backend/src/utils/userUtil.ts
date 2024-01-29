import { compare, genSalt, hash } from "bcrypt";
const config = require("../config");

export const createHash = async (password: string) => {
  const saltRounds = 10;

  const salt = await genSalt(saltRounds);
  return await hash(password, salt);
};
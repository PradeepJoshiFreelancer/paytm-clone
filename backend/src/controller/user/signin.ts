import { RequestHandler } from "express";
import { NewUser, User } from "../../models/usersModels";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { z } from "zod";
const config = require("../../config");

const userSigninSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});
export const singinUser: RequestHandler<User> = async (req, res) => {
  const { success } = userSigninSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ message: "Invalid request input!" });
    return;
  }
  const user = req.body;
  user.username = req.body.username.toLowerCase()


  const existingUser = await NewUser.findOne({ username: user.username });

  if (existingUser) {
    const isPasswordValid = await compare(user.password, existingUser.password);
    if (isPasswordValid) {
      const token = sign(existingUser.id, config.JWT_SECRET);

      return res.status(200).json({
        token: `Bearer ${token}`,
      });
    }
  }
  res.status(411).json({ message: "Error while logging in" }); 
};

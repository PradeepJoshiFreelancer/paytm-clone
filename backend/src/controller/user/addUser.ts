import { RequestHandler } from "express";
import { z } from "zod";
import { Account, NewAccount, NewUser, User } from "../../models/usersModels";
import { createHash } from "../../utils/userUtil";
import { sign } from "jsonwebtoken";
const config = require("../../config");


const userSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
  })

  export const addNewUser: RequestHandler<User> = async (req, res) => {
    const { success } = userSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({message: "Invalid request input!"})
        return
    }

    const user = req.body;
    user.username = req.body.username.toLowerCase()
  
    const existingUser = await NewUser.findOne({ username: user.username });
    if (existingUser) {
      res.status(411).json({ message: "Email already taken / Incorrect inputs" });
      return;
    }
    const encryptedPassword = await createHash(user.password);
    user.password = encryptedPassword;
    const response = await NewUser.create(user);
    const userId = response._id
    
    const account = {
      userId: userId,
      balance: 1 + Math.random() * 10000
    }
    await NewAccount.create(account)
    const token = sign(response.id, config.JWT_SECRET);
    return res.status(200).json({
      userId: response.id,
      token: `Bearer ${token}`,
    });
  };
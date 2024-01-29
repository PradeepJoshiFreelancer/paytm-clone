import { RequestHandler } from "express";
import { createHash } from "../../utils/userUtil";
import { NewUser } from "../../models/usersModels";
import { z } from "zod";

const updateUserSchema = z.object({
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const updateUser: RequestHandler = async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ message: "Invalid request input!" });
    return;
  }
  const userId = req.body.userId;

  const existingUser = await NewUser.findById({ _id: userId });

  if (existingUser) {
    const encryptedPassword = await createHash(req.body.password);
    await NewUser.findOneAndUpdate(
      { _id: userId },
      {
        password: encryptedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }
    );
    res.status(200).json({ message: `Updated details for user ${userId}` });
    return;
  }

  res
    .status(411)
    .json({ message: `Unable to find the participant ${userId}` });
};

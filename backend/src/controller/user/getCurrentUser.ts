import { RequestHandler } from "express";
import { NewAccount, NewUser } from "../../models/usersModels";

interface finalResult {
  id: string;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

export const getCurrentUser: RequestHandler = async (req, res) => {
  const currentUserId = req.body.userId;
  console.log(currentUserId);

  const currentUser = await NewUser.findOne({ _id: currentUserId });
  if (currentUser) {
    const account = await NewAccount.findOne({ userId: currentUserId });
    let balance = 0;
    if (account) {
      balance = account.balance;
    }
    res
      .status(200)
      .json({
        user: {
          username: currentUser.username,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          balance: balance,
        },
      });
    return;
  }
  res.status(500).json({ message: "Unable to find the User" });
};

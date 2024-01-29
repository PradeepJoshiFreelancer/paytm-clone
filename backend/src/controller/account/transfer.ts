import { RequestHandler } from "express";
import { startSession } from "mongoose";
import { z } from "zod";
import { NewAccount, NewUser } from "../../models/usersModels";

const transferBody = z.object({
  toUserId: z.string(),
  amount: z.number(),
});

export const transfer: RequestHandler = async (req, res) => {
  const { success } = transferBody.safeParse(req.body);

  if (!success) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  const fromUserId = req.body.userId;
  const session = await startSession();
  try {
    session.startTransaction();

    const fromAccount = await NewAccount.findOne({ userId: fromUserId });
    if (!fromAccount || fromAccount.balance < req.body.amount) {
      (await session).abortTransaction();
      res.status(400).json({ message: "Insufficent balance" });
      return;
    }

    const toAccount = await NewUser.findOne({ _id: req.body.toUserId });
    
    if (!toAccount) {
      (await session).abortTransaction();
      res.status(400).json({ message: "Invalid account" });
      return;
    }

    await NewAccount.findOneAndUpdate(
      { userId: fromUserId },
      { $inc: { balance: -req.body.amount } }
    ).session(session);

    await NewAccount.findOneAndUpdate(
      { userId: toAccount.id },
      { $inc: { balance: req.body.amount } }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({ message: "Transfer succesfull" });
    return;
  } catch (err) {
    (await session).abortTransaction();
    console.log("An error has occured during the transaction");
  } finally {
    await session.endSession();
  }
  res.status(400).json({ message: "Unable to transfer." });
};

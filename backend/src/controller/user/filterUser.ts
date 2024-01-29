import { RequestHandler } from "express";
import { NewUser } from "../../models/usersModels";

interface finalResult {
  id: string;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

export const getUserByFilter: RequestHandler = async (req, res) => {
  const filter = req.query.filter || "";

  let result: finalResult[] = [];

  const currentUser = req.body.userId;

  if (filter && filter != "") {
    const users = await NewUser.find({
      $or: [
        { firstName: { $regex: ".*" + filter + ".*", $options: "i" } },
        { lastName: { $regex: ".*" + filter + ".*", $options: "i" } },
      ],
    });
    users.map((item) => {
      if (item.id != currentUser) {
        const finalUser: finalResult = {
          id: item.id,
          username: item.username,
          firstName: item.firstName,
          lastName: item.lastName,
        };
        result.push(finalUser);
      }
    });
  } else {
    const users = await NewUser.find();

    users.map((item) => {
      if (item.id != currentUser) {
        const finalUser: finalResult = {
          id: item.id,
          username: item.username,
          firstName: item.firstName,
          lastName: item.lastName,
        };
        result.push(finalUser);
      }



      
    });
  }

  res.status(200).json({ users: result });
};

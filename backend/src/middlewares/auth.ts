import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
const config = require("../config");
export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  console.log(`url = ${req.url}`);
  console.log(`auth = ${auth}`);
  console.log(`body = ${JSON.stringify(req.body)}`);

  let token = "";
  if (auth && auth !== "" && auth.split(" ").length > 1) {
    token = auth.split(" ")[1];
  }
  try {
    const verified = verify(token, config.JWT_SECRET);
    if (verified) {
      req.body.userId = verified;
      next();
      return;
    }
  } catch (e: any) {
    res.status(403).json({ message: "Invalid authorization" });
    return;
  }
  res.status(403).json({ message: "Invalid authorization" });
};

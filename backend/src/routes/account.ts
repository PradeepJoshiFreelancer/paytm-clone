import {
  Router,
} from "express";
import { validateToken } from "../middlewares/auth";
import { getBalance } from "../controller/account/getBalance";
import { transfer } from "../controller/account/transfer";


export const accountRouter = Router();

accountRouter.get("/balance", validateToken, getBalance)
accountRouter.post("/transfer", validateToken, transfer)
import {
  Router,
} from "express";
import { validateToken } from "../middlewares/auth";
import { addNewUser } from "../controller/user/addUser";
import { singinUser } from "../controller/user/signin";
import { updateUser } from "../controller/user/updateUser";
import { getUserByFilter } from "../controller/user/filterUser";
import { getCurrentUser } from "../controller/user/getCurrentUser";

export const userRouter = Router();

userRouter.post("/signup", addNewUser) 
userRouter.post("/signin", singinUser) 
userRouter.put("/", validateToken, updateUser)
userRouter.get("/", validateToken, getUserByFilter)
userRouter.get("/currentuser", validateToken, getCurrentUser)

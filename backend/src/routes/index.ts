import { Router } from "express";
import { userRouter } from "./users";
import { accountRouter } from "./account";

export const router = Router()

router.use("/user", userRouter)
router.use("/account", accountRouter)
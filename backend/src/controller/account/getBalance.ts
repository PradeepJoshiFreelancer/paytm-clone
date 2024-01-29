import { RequestHandler } from "express";
import { NewAccount } from "../../models/usersModels";

export const getBalance:RequestHandler = async (req,res)=>{
    const userId = req.body.userId

    const account = await NewAccount.findOne({
        userId: userId
    })
    if (account){
        res.status(200).json({balance: account.balance}) 
    }else{
        res.status(200).json({balance: 0}) 

    }
    
} 
import { Account } from "../models/accountModel.js"
import { User } from "../models/userModel.js"
import {CustomResponse} from "../util/customResponse.js"
import mongoose from "mongoose"

export const getAccount = async (req, res, next) => {
    const account = await Account.findOne({userId: req.user._id})
    return res.send(new CustomResponse(200, "success", {account}, ""))
}

export const balance = async (req, res, next) => {
    const user  = req.user

    return res.send(new CustomResponse(200, "success", {balance: user.balance}, ""))
    // res.status(200).json({
    //     balance: user.balance
    // })
}

export const transfer = async (req, res, next) => {
    console.log("hua")
    const session = await mongoose.startSession()
    session.startTransaction()

    const { to, amount } = req.body

    const user = await User.findById(to).session(session)
    
    if(amount < 0) {
        return res.send(new CustomResponse(400, "fail", {}, "Enter valid amount"))
    }
    if(!user) {
        await session.abortTransaction()
        return res.send(new CustomResponse(400, "fail", {}, "Invalid Account"))
        // return res.status(400).json({
        //     message: "Invalid account"
        // })
    }

    const accountTo = await Account.findOne({userId: new mongoose.Types.ObjectId(to)})
    const accountFrom = await Account.findOne({userId: req.user._id})

    if(accountFrom.balance < amount) {
        await session.abortTransaction()
        return res.send(new CustomResponse(400, "fail", {}, "Insufficient balance"))
        // return res.status(400).json({
        //     message: "Insufficient balance"
        // })
    }

    
    
    
    await Account.updateOne({userId: new mongoose.Types.ObjectId(to)}, {$inc: {balance: amount}}).session(session)
    await Account.updateOne({userId: req.user._id}, {$inc: {balance: -amount}}).session(session)

    
    await session.commitTransaction()
    
    return res.send(new CustomResponse(200, "Transfer successful", {}, ""))
    // return res.status(200).json({
    //     message: "Transfer successful"
    // })

}
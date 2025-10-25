import { Account } from "../models/accountModel.js"
import { User } from "../models/userModel.js"
import { getToken } from "../util/getToken.js"
import {CustomResponse} from "../util/customResponse.js"
import mongoose from "mongoose"
export const getUser = async (req, res, next) => {
    console.log("get user")
    console.log('red user', req.user)
    return res.send(new CustomResponse(400, "success", req.user, ""))
}


export const signup = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    
    if(!firstname || !lastname || !email || !password) {
        return res.send(new CustomResponse(400, "fail", {}, "provide all fields for signup"))
        // throw new Error("provide all fields for signup")
    }

    const alreadyUser = await User.findOne({email})

    if(alreadyUser) {
        return res.send(new CustomResponse(400, "fail", {}, "User with this email already exists"))
        // throw new Error("user with this email already exits")
    }


    const user = await User.create({
        firstname,
        lastname,
        email,
        password
    })

    if(!user) {
        return res.send(new CustomResponse(400, "fail", {}, "DB Error"))
        // throw new Error("user not created check db")
    }

    const userId = user._id
    await Account.create({
        userId,
        balance:  5000
    })
    
    const token = getToken(user)
    
    return res.send(new CustomResponse(200, "User created success", {user, token}, ""))
    // res.status(200).json({
    //     message: "user created success",
    //     user,
    //     token
    // })
}

export const updateUser = async (req, res, next) => {
    const { firstname, lastname, email } = req.body
    if(!firstname || !lastname || !email)  {
        return res.send(new CustomResponse(400, "fail", {}, "provide all fields for signin"))
        // throw new Error("provide all the details")
    }

    const user = await User.findOneAndUpdate({email}, {
        firstname,
        lastname,
        email
    }, {new: true})
    
    if(!user) {
        return res.send(new CustomResponse(400, "fail", {}, "User not found with this email"))
        // throw new Error("user not found with this email")
    }
        

    const token = getToken(user)
    return res.send(new CustomResponse(200, "User updated success", {user, token}, ""))
    // res.status(200).json({
    //     message: "user update success",
    //     user,
    //     token
    // })
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password)
    if(!email || !password) {
        return res.send(new CustomResponse(400, "fail", {}, "provide all fields for signin"))
        // throw new Error("provide email and password")
    }

    const user = await User.findOne({email})

    if(!user) {
        return res.send(new CustomResponse(400, "fail", {}, "user not found"))
        // throw new Error("user not found")
    }

    const validPassword = await user.verifyPassword(password)

    if(!validPassword) {
        return res.send(new CustomResponse(400, "fail", {}, "password not correct"))
        // throw new Error("password not correct")
    }

    const token = getToken(user)
    return res.send(new CustomResponse(200, "user login success", {user,token}, ""))
    // res.status(200).json({
    //     message: "user login success",
    //     user,
    //     token
    // })
}

export const filteredUser = async (req, res, next) => {
    const filter = req.query.filter

    console.log(filter)
    if(!filter) {
        return res.send(new CustomResponse(400, "fail", {}, "Faulty URL"))
        // throw new Error("search keyword not found")
    }

    const users = await User.find({
        $or: [{
            firstname: filter
        },{
            lastname: filter
        }]
    })

    return res.send(new CustomResponse(200, "data fetched successfully", {
        user: users.map(user => ({
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    }, ""))
    // res.status(200).send({
    //     user: users.map(user => ({
    //         firstname: user.firstname,
    //         lastname: user.lastname,
    //         _id: user._id
    //     }))
    // })
}

export const getAnotherUser = async (req, res, next) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    console.log(id)
    const user = await User.findOne({_id:id})
    console.log(user)
    return res.send(new CustomResponse(200, "success", user, ""))
}
import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js"

export const auth = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ","")

    if(!token) 
        throw new Error("jwt token not found")

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken.id)

    if(!user) 
        throw new Error("user not found")

    console.log(user)

    req.user = user
    
    console.log(req.user)
    
    return next()
}
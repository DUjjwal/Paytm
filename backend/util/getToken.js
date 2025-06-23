import jwt from "jsonwebtoken"
import dotenv from "dotenv/config"

export const getToken = (user) => {
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })

    return token

}
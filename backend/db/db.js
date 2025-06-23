import mongoose from "mongoose"
import dotenv from "dotenv/config"

export const connectDB = () => {
    return mongoose.connect(`${process.env.MONGODB_URL}`)
}
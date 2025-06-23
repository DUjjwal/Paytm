import { connectDB } from "./db/db.js";
import express from "express"
import cors from "cors"
import dotenv from "dotenv/config"
const app = express()

app.use(express.json())
app.use(cors())

connectDB()
.then(() => {
    console.log(`db connected successfully`)
    app.listen(4000, () => {
        console.log(`Server is listening at port 4000`)
    })
})
.catch((err) => {
    console.log(`DB Error`, err)
    process.exit(1)
})

export default app

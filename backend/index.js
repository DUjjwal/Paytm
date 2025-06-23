import app from "./app.js";
import router from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRoutes.js"
import dotenv from "dotenv/config"
app.use("/user", router)
app.use("/account", accountRouter)
app.get("/hello", (req, res) => {
    res.send("hello")
})

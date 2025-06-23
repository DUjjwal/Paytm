import express from "express"
import { Router } from "express"

import { filteredUser, getUser, loginUser, signup, updateUser, getAnotherUser } from "../controllers/userController.js"
import { auth } from "../middleware/auth.js"
const router = Router()

router.route("/get/:id").get(getAnotherUser)
router.route("/signup").post(signup)
router.route("/update").post(auth, updateUser)
router.route("/login").post(loginUser)
router.route("/search").get(auth, filteredUser)
router.route("/me").get(auth, getUser)


export default router
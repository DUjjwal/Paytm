import { Router } from "express";
import { balance, getAccount, transfer } from "../controllers/accountController.js";
import { auth } from "../middleware/auth.js";

const router = Router()


router.route("/balance").get(auth, balance)
router.route("/transfer").post(auth, transfer)
router.route("/me").get(auth, getAccount)


export default router
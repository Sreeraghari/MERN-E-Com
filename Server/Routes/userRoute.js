import express from "express";
const authRouter = express.Router()
import {authUser,getUserProfile,registerUser} from "../Controllers/userControl.js"
import {protect} from "../MIddleware/authMiddleware.js"

authRouter.route("/register").post(registerUser)
authRouter.route("/login").post(authUser)
authRouter.route("/profile").get(protect,getUserProfile)


export default authRouter
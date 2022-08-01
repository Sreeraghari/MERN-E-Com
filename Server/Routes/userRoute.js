import express from "express";
const authRouter = express.Router()
import {authUser,deleteUser,getUser,
    getUserById,getUserProfile,registerUser,
    updateUser,updateUserProfile} from "../Controllers/userControl.js"
import {isAdmin, protect} from "../MIddleware/authMiddleware.js"

authRouter.route("/").post(registerUser).get(protect,isAdmin,getUser)
authRouter.route("/login").post(authUser)
authRouter.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
authRouter.route("/:id").delete(protect,isAdmin,deleteUser).get(protect,isAdmin,getUserById)
.put(protect,isAdmin,updateUser)

export default authRouter
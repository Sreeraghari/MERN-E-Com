import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../Model/Usermodel.js"

const protect=asyncHandler(async(req,res,next)=>{
    let token
    console.log("token"+token);
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(" ")[1]
            const decode =jwt.verify(token,"sreerag")
            // console.log(decode);
            req.user=await  User.findById(decode.id).select("-password")
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized,token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('No token')   
    }
})

const isAdmin=(req,res,next)=>{
    // console.log(req.user.isAdmin)
  if(req.user&&req.user.isAdmin){
      next()
  }else{
      res.status(401)
      throw new Error("your not an admin")
  }
}

export {protect,isAdmin}
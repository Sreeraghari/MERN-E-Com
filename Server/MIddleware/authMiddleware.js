import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../Model/Usermodel.js"

const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization){
        try {
            token=req.headers.authorization.split(" ")[1]
            const decode =jwt.verify(token,"sreerag")
            req.user=await  User.findById(decode.id)
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

export {protect}
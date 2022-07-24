import jwt from "jsonwebtoken"
const generateToken =(id)=>{
    return jwt.sign({id},"sreerag",{expiresIn:"30d"})
}

export default generateToken
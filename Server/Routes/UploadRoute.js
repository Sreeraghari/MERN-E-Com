import express from  "express"
import multer from "multer" 
import path from "path"
const uploadRoute=express.Router()

const storage =multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,`${file.filename}-${Date.now()}${path.extname(file.originalname)}`      )
    }
})

// function checkFile(file,cb){
//    const fileTypes=/jpg|jpeg|png/
//    const extname=fileTypes.test(path.extname( file))
//    const mimeType=fileTypes.test(file.mimeType)

//    if(extname&&mimeType){
//        return cb(null,true)
//    }
//    else{
//        cb('images only!')
//    }
// }

const upload=multer({
    storage,
    // fileFilter:function(req,file,cb){
    //     checkFile()
    // }
})

uploadRoute.post('/',upload.single('image'),(req,res)=>{
    res.send(`/${req.file.path}`)
})

export default uploadRoute
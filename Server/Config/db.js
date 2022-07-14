import mongoose from "mongoose";

const connectdb= async()=>{
    try{
       mongoose.connect("mongodb://localhost:27017/MyAppMern")
       
      console.log("mongo db connected")
    }
    catch(err){
        console.log(err);
    }
}
export default connectdb
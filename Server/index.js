import express from "express"
import cors from "cors"
import connectdb from "./Config/db.js"
import productRouter from "./Routes/productRoute.js"
import { errorHandler, notFound } from "./MIddleware/Error.js"
import authRouter from "./Routes/userRoute.js"
import orderRoute from "./Routes/OrderRote.js"
import dotenv from "dotenv"
import uploadRoute from "./Routes/UploadRoute.js"
import path from "path"

dotenv.config()
connectdb()
const app= express()
app.use(cors())
app.use(express.json())

// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.urlencoded())


app.use("/products",productRouter)
app.use("/users",authRouter)
app.use("/orders",orderRoute)
app.use("/upload",uploadRoute)

app.get("/config/paypal",(req,res)=>res.send(process.env.PAYPAL_ID)
)
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(errorHandler)
app.use(notFound)

app.listen(5000,()=>{
    console.log("port running at 5000")
})
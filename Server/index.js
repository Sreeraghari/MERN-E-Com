import express from "express"
import cors from "cors"
import connectdb from "./Config/db.js"
import productRouter from "./Routes/productRoute.js"
import { errorHandler, notFound } from "./MIddleware/Error.js"
import authRouter from "./Routes/userRoute.js"

const app= express()
connectdb()

app.use(cors())
app.use(express.json())

app.use("/products",productRouter)
app.use("/users",authRouter)

app.use(errorHandler)
app.use(notFound)

app.listen(5000,()=>{
    console.log("port running at 5000");
})
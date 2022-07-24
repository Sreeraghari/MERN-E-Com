import express from "express";
const productRouter = express.Router()
import {getProduct,getProductById} from "../Controllers/productController.js"

productRouter.route("/").get(getProduct)

productRouter.route("/:id").get(getProductById)

export default productRouter
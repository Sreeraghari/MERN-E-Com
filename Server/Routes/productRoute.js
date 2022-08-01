import express from "express";
const productRouter = express.Router()
import {createProduct, deleteProduct, getProduct,getProductById,upatedProduct} from "../Controllers/productController.js"
import {protect,isAdmin} from "../MIddleware/authMiddleware.js"

productRouter.route("/").get(getProduct).post(protect,isAdmin,createProduct)
productRouter.route("/:id").get(getProductById).delete(protect,isAdmin,deleteProduct)
.put(protect,isAdmin,upatedProduct)

export default productRouter
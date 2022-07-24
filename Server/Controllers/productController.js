import asyncHandler from "express-async-handler"
import Product from "../Model/ProductModel.js";

const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

const getProductById =asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        return res.json(product)
    }
    else {
        return res.status(404).json({ message: "product not found" })
    }

})

export{getProduct,getProductById}
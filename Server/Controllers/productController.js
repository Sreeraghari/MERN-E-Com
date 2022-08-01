import asyncHandler from "express-async-handler";
import Product from "../Model/ProductModel.js";

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ message: "product not found" });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(401);
    throw new Error("Product not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    user: req.user._id,
    name: "SampleName",
    image: "/images/sample.jpg ",
    brand: "Sample Brand",
    category: "Sample Category",
    description: "Sample Description",
    numReview: 0,
    price: 0,
    countInStock: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const upatedProduct=asyncHandler(async(req,res)=>{

    const product=await Product.findById(req.params.id)
// console.log(req.body);
    const{ 
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock
    }=req.body
// console.log(name);
        if(product){
          product.name=name,
          product.image=image
          product.brand=brand
          product.category=category
          product.description=description
          product.price=price
          product.countInStock=countInStock

          const updateProducts=await product.save()
          res.json(updateProducts)

        }else{
            res.json(402)
            throw new Error("product not found")
        }
})


export { getProduct, getProductById, deleteProduct,createProduct,upatedProduct };

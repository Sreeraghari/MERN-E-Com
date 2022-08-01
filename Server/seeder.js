import mongoose from "mongoose";
import products from "./Data/product.js";
import users from "./Data/users.js";
import User from "./Model/Usermodel.js";
import Product from "./Model/ProductModel.js";
import Order from "./Model/OrderModel.js";
import connectdb from "./Config/db.js";

connectdb()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
 

        const createdusers = await User.insertMany(users)

        const adminuser = createdusers[0]._id

        const Sampleproduct = products.map((p) => {
            return { ...p,user:adminuser }
        })

        await Product.insertMany(Sampleproduct)

        console.log("data imported successfully")

        process.exit()
    }
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
       await User.deleteMany()
       await Product.deleteMany()
       await Order.deleteMany()
        console.log("data deleted successfully")
        process.exit()
    }
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}
importData()
// deleteData()
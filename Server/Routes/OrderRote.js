import express from "express"
const orderRoute=express.Router()
import { addOrderItems,getMyOrder,getOrder,getOrderById, upadateOrderToDelivered, upadateOrderToPaid } from "../Controllers/OrderController.js"
import {isAdmin, protect} from "../MIddleware/authMiddleware.js"

orderRoute.route("/").post(protect,addOrderItems).get(protect,isAdmin,getOrder)
orderRoute.route("/myorders").get(protect,getMyOrder)
orderRoute.route("/:id").get(protect,getOrderById)
orderRoute.route("/:id").put(protect,upadateOrderToPaid)
orderRoute.route("/:id/del").put(protect,isAdmin,upadateOrderToDelivered)
export default orderRoute
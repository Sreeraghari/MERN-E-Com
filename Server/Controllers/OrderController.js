import asyncHandler from "express-async-handler";
import Order from "../Model/OrderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(402);
    throw new Error("no order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await (
    await Order.findById(req.params.id)
  ).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

const upadateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true,
      order.paidAt = Date.now(),
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };
    const updateOrder=await order.save()
    res.json(updateOrder)
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});


const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({user:req.user._id});
  res.json(orders)
});

const getOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name')
  res.json(orders)
});

const upadateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params._id);
  console.log(order);

  if (order) {
    order.isDelivered = true,
      order.isDelivered = Date.now()
    const updateOrder=await order.save()

    res.json(updateOrder)
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});


export { addOrderItems, getOrderById,upadateOrderToPaid,getMyOrder,getOrder,upadateOrderToDelivered};

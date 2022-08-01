import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_CART_SHIPPING_ADDRESS,
  SAVE_PAYMENT,
} from "../Constants/Cartconst";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/products/${id}`);
  // console.log(id);
  // console.log(data);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems));
};

export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartitems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: SAVE_CART_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePayment = (data) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT,
    payload: data,
  });

  localStorage.setItem("payment", JSON.stringify(data));
};

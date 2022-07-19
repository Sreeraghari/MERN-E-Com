import axios from "axios";
import { CART_ADD_ITEM } from "../Constants/Cartconst";

export const addToCart=(id,qty)=>async(dispatch,getState)=>{
    const { data } = await axios.get(`http://localhost:5000/products/${id}`)

    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty

        }
    })

    localStorage.setItem("cartitems",JSON.stringify(getState().cart.cartitems))
}
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
   PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "../Constants/Constants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {

    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get("http://localhost:5000/products")

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

  } catch (error) {

    dispatch({ type: PRODUCT_LIST_FAIL, payload: error })
  }
}



export const listProductDetails = (id) => async (dispatch) => {
  try {
    
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/products/${id}`)

    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })

  } catch (error) {

    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error })
  }
}
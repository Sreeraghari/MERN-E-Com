import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
   PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL } from "../Constants/Constants";
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

export const deleteProduct=(id)=>async(dispatch,getState)=>{
  try {
    dispatch({
      type:PRODUCT_DELETE_REQUEST
    })

    const {userLogin:{userInfo}}=getState()

    const config={
      headers:{
        authorization: `Bearer ${userInfo.token}`,
      }
    }

   await axios.delete(`http://localhost:5000/products/${id}`,config)

      dispatch({
        type:PRODUCT_DELETE_SUCCESS
      })
        
  } 
  catch (error) {

    dispatch({
      type:PRODUCT_DELETE_FAIL,
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
    
  }
}

export const createProduct=()=>async(dispatch,getState)=>{
  try {
    dispatch({
      type:PRODUCT_CREATE_REQUEST
    })

    const {userLogin:{userInfo}}=getState()

    const config={
      headers:{
        authorization: `Bearer ${userInfo.token}`,
      }
    }

  const{data} = await axios.post(`http://localhost:5000/products`,{},config)

      dispatch({
        type:PRODUCT_CREATE_SUCCESS,
        payload:data
      })
        
  } 
  catch (error) {

    dispatch({
      type:PRODUCT_CREATE_FAIL,
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
    
  }
}

export const updateProduct=(product)=>async(dispatch,getState)=>{
  console.log(product);
  try {
    dispatch({
      type:PRODUCT_UPDATE_REQUEST
    })

    const {userLogin:{userInfo}}=getState()

    const config={
      headers:{
        authorization: `Bearer ${userInfo.token}`,
      }
    }

  const{data} = await axios.put(`http://localhost:5000/products/${product._id}`,product,config)

      dispatch({
        type:PRODUCT_UPDATE_SUCCESS,
        payload:data
      })
        
  } 
  catch (error) {

    dispatch({
      type:PRODUCT_UPDATE_FAIL,
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
    
  }
}
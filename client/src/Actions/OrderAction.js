import axios from 'axios'
import {
  ORDER_CREATE_FAIL,ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS,
  ORDER_CREATE_SUCCESS,ORDER_PAY_FAIL,ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,ORDER_PAY_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_LISTS_REQUEST,
  ORDER_LISTS_SUCCESS,
  ORDER_LISTS_FAIL,
  ORDER_ADMIN_REQUEST,
  ORDER_ADMIN_SUCCESS,
  ORDER_ADMIN_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../Constants/OrderConst";

export const createOrderAction = (order) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    // console.log(userInfo.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/orders`,
      order,
      config
    );
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const getOrderDetail = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    // console.log(userInfo.token);
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/orders/${id}`,
      config
    );
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const payOrder = (orderId,paymentResult) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    // console.log(userInfo.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/orders/${orderId}`,paymentResult,
      config
    );
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const deliverOrder = (orderid) => async(dispatch, getState) => {
  try {
    console.log(orderid);
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    // console.log(userInfo.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/orders/${orderid}/del`,
      config
    );
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const orderLists = () => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LISTS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    // console.log(userInfo.token);
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/orders/myorders`,config
    );
    dispatch({
      type: ORDER_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const orderAdminList = () => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_ADMIN_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    // console.log(userInfo.token);
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/orders/`,config
    );
    dispatch({
      type: ORDER_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};


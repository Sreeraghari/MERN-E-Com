import {
  ORDER_CREATE_FAIL,ORDER_DETAIL_FAIL,ORDER_LISTS_FAIL,
  ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS,ORDER_LISTS_REQUEST,
  ORDER_CREATE_SUCCESS,ORDER_PAY_FAIL,ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,ORDER_PAY_SUCCESS,ORDER_LISTS_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_LISTS_RESET,
  ORDER_ADMIN_REQUEST,
  ORDER_ADMIN_SUCCESS,
  ORDER_ADMIN_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../Constants/OrderConst"

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default: return state
  }
}

export const orderDetailReducer = ( state = {loading:true, orderItem:[],shippingAddress:{}}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS
    :
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default: return state
  }
};

export const orderPayReducer = ( state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS
    :
      return {
        loading: false,
        success:true
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case ORDER_PAY_RESET:
        return{}
    default: return state
  }
};

export const orderDeliverReducer = ( state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS
    :
      return {
        loading: false,
        success:true
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.Payload,
      };
      case ORDER_DELIVER_RESET:
        return{}
    default: return state
  }
};

export const orderListsReducer = ( state = {Orders:[]}, action) => {
  switch (action.type) {
    case ORDER_LISTS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LISTS_SUCCESS
    :
      return {
        loading: false,
        Orders:action.payload
      };
    case ORDER_LISTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case ORDER_LISTS_RESET:
        return {Orders:[]}
    default: return state
  }
};

export const orderAdminReducer = ( state = {Order:[]}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case ORDER_ADMIN_SUCCESS
    :
      return {
        loading: false,
        Order:action.payload
      };
    case ORDER_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default: return state
  }
};


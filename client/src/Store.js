import {createStore,applyMiddleware,combineReducers} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productCreateReducer, productDeleteReducer, productDetailReducer, productListReducer, productUpdateReducer } from "./Reducers/ProductListReducer"
import { cartReducer } from "./Reducers/cartReducer"
import { profileUpdateReducer, userDeleteReducer, userDetailReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./Reducers/userReducers"
import { orderAdminReducer, orderCreateReducer, orderDeliverReducer, orderDetailReducer, orderListsReducer, orderPayReducer } from "./Reducers/OrderReducer"

const reducer = combineReducers({
    ProductList:productListReducer,
    ProductDetail:productDetailReducer,
    ProductDelete:productDeleteReducer,
    ProductCreate:productCreateReducer,
    productUpdated:productUpdateReducer,
  cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetail:userDetailReducer,
    userUpdatedProfile:profileUpdateReducer,
    userLists:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
  orderCreated:orderCreateReducer,
  orderDetails:orderDetailReducer,
  orderPay:orderPayReducer,
  orderDeliver:orderDeliverReducer,
  orderMyLists:orderListsReducer,
  orderAdmin:orderAdminReducer,
})

const cartFromLocalStrg = localStorage.getItem("cartitems") ? 
JSON.parse(localStorage.getItem("cartitems")):[]

const userInfoFromLocalStrg = localStorage.getItem("userInfo") ? 
JSON.parse(localStorage.getItem("userInfo")):null

const shippingInfoFromLocalStrg = localStorage.getItem("shippingAddress") ? 
JSON.parse(localStorage.getItem("shippingAddress")):{}

const initialState= {
  cart:{cartitems:cartFromLocalStrg,
  shippingAddress:shippingInfoFromLocalStrg,},
  userLogin:{userInfo:userInfoFromLocalStrg},

}

const middleware=[thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
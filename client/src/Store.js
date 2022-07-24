import {createStore,applyMiddleware,combineReducers} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productListReducer } from "./Reducers/ProductListReducer"
import { cartReducer } from "./Reducers/cartReducer"
import { userLoginReducer, userRegisterReducer } from "./Reducers/userReducers"

const reducer = combineReducers({
  ProductList:productListReducer,
  ProductDetail:productDetailReducer,
  cart:cartReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer
})

const cartFromLocalStrg = localStorage.getItem("cartitems") ? 
JSON.parse(localStorage.getItem("cartitems")):[]

const userInfoFromLocalStrg = localStorage.getItem("userInfo") ? 
JSON.parse(localStorage.getItem("userInfo")):null

const initialState= {
  cart:{cartitems:cartFromLocalStrg},
  userLogin:{userInfo:userInfoFromLocalStrg}
}

const middleware=[thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
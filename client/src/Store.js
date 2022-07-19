import {createStore,applyMiddleware,combineReducers} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productListReducer } from "./Reducers/ProductListReducer"
import { cartReducer } from "./Reducers/cartReducer"

const reducer = combineReducers({
  ProductList:productListReducer,
  ProductDetail:productDetailReducer,
  cart:cartReducer
})

const cartFromLocalStrg = localStorage.getItem("cartitems") ? 
JSON.parse(localStorage.getItem("cartitems")):[]

const initialState= {

  cart:{cartitems:cartFromLocalStrg}
}

const middleware=[thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
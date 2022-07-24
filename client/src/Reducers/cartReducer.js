import { CART_ADD_ITEM,CART_REMOVE_ITEM } from "../Constants/Cartconst";

export const cartReducer =(state={cartitems:[]},action)=>{
    switch(action.type){
        case CART_ADD_ITEM :
            const item= action.payload
        
            const existItem= state.cartitems.find(x=>x.product === item.product)

            if(existItem){
                return{
                    ...state,
                    cartitems:state.cartitems.map(x=>x.product === existItem.product ? item : x)
                }
            }
            else{
                return{
                    ...state,
                    cartitems:[...state.cartitems,item]
                }
            }
        case CART_REMOVE_ITEM :
            return{
                ...state,
                cartitems:state.cartitems.filter((x)=>x.product!== action.payload)
            }    
        default :return state    
    }
}
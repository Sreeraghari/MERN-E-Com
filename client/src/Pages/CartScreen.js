import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { addToCart } from '../Actions/CartAction'

export const CartScreen = () => {
  const { id } = useParams()

  const location = useLocation()

  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  const cart= useSelector(state=>state.cart)

 const {cartitems}=cart
 console.log(cartitems)
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }

  }, [dispatch,id, qty])

  // console.log("location is "+qty)
  return (
    <div>
      cart
    </div>
  )
}

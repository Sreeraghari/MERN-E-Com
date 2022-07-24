import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { addToCart, removeCartItem } from '../Actions/CartAction'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'

export const CartScreen = () => {
  const { id } = useParams()

  const location = useLocation()

  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  const navigate=useNavigate()

  const cart = useSelector(state => state.cart)

  const { cartitems } = cart
  // console.log(cartitems);
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }

  }, [dispatch,addToCart, id, qty])

  const removeFromCart = (id) => dispatch(removeCartItem(id))

  const checkout=()=>navigate("/login?redirect=shipping")
  
  // console.log("location is "+qty)
  return (
    <div>
      <Row>
        <Col md={8}>
          <h2>SHOPPING CART</h2>
          {cartitems.length === 0 ? (
            <h2>your cart is empty</h2>
          ) : (
            <ListGroup variant='flush' >
              {cartitems.map(items => (
                <ListGroupItem key={items.product}>
                  <Row>
                    <Col md={2} >
                      <Image src={items.image} alt={items.name} fluid rounded />
                    </Col>                    <Col md={2}>{items.price}</Col>
                    <Col md={3}>
                      <Link to={`/product/${items.product}`}>{items.name}</Link>
                    </Col>
                    <Col md={2}>{items.price}</Col>
                    <Col md={2}>
                      <ListGroupItem as="select" value={items.qty} onChange={(e) => dispatch(addToCart(items.product, Number(e.target.value)))}>
                        {[...Array(items.countInStock).keys()].map(x =>
                          <option value={x + 1} key={x + 1}>{x + 1}</option>
                        )}
                      </ListGroupItem>
                    </Col>
                  </Row>
                  <Col md={2}>
                    <Button onClick={() => removeFromCart(items.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>
                  Subtotal({cartitems.reduce((pre, cur) => pre + cur.qty, 0)})
                </h2>
                {cartitems.reduce((prev, curr) => prev + curr.price * curr.qty, 0)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type='button' className='btn-block' disabled={cartitems.length === 0} onClick={() => { checkout() }} >
                  proceed to checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

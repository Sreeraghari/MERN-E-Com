import React, { useState } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link, useParams, } from 'react-router-dom'
import Review from '../Components/Review'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from "../Actions/ProductActions"
import {useNavigate} from 'react-router-dom'

const ProductScreen = () => {

    const [qty, setqty] = useState(1)

    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate=useNavigate()

    const productDetails = useSelector((state) => state.ProductDetail)

    const { product, loading, error } = productDetails


    useEffect(() => {
        dispatch(listProductDetails(id))

    }, [])

    const addtocartHandler=()=>{
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to="/">Go Back</Link>

            {loading ? <h1>LOADING...</h1> : error ? <h1>{error}</h1> : (
                <Row >
                    <Col md={6} >
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h4>  {product.name}</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Review value={product.rating} text={`${product.numReviews}reviews`} />
                            </ListGroupItem> <ListGroupItem>
                                Price:  ${product.price}
                            </ListGroupItem> <ListGroupItem>
                                Description:{product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card >
                            <Row>
                                <Col>
                                    <h5>Price: ${product.price}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Status:{product.countInStock > 0 ? product.countInStock : "Out of Stock"}</h5>
                                </Col>
                            </Row>
                            {product.countInStock > 0 && (
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <ListGroupItem as="select" value={qty} onChange={(e) => setqty(e.target.value)}>
                                        { [...Array(product.countInStock).keys()].map(x=>
                                            <option value={x+1} key={x+1}>{x+1}</option>
                                        )}                                      
                                        </ListGroupItem>
                                    </Col>
                                </Row>
                            )}
                            <Row>
                                <Button 
                                onClick={addtocartHandler}
                                className='btn btn-dark' disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>

            )}
        </>
    )
}

export default ProductScreen
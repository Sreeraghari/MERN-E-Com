import React from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Review from '../Components/Review'
import { useState,useEffect } from 'react'
import axios from 'axios'

const ProductScreen = () => {

    const[product,setProduct]=useState({})
    const params = useParams()
    useEffect(() => {

        const fetchProduct= async()=>{
        const {data} = await axios.get(`http://localhost:5000/products/${params.id}`)
        setProduct(data)
        console.log(data);
        }
    fetchProduct()
    }, [])
    
    return (
        <>
            <Link className='btn btn-dark my-3' to="/">Go Back</Link>
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
                        <Row>
                            <Button className='btn btn-dark' disabled={product.countInStock===0}>
                                Add to Cart
                            </Button>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
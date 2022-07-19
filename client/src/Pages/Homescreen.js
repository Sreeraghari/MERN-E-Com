import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from "../Actions/ProductActions"

const Homescreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.ProductList)

    const { loading, products, error } = productList

    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])

    return (
        <>

            <h1>Product List</h1>
            {loading ? <h1>Loading....</h1> : error ? <h1>{error}</h1>:
                <Row>
                    {products.map((product) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3} >
                            <Product prdct={product} />
                        </Col>
                    ))}

                </Row>
                

            }

        </>
    )
}

export default Homescreen
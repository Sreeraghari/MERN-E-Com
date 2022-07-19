import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Review from './Review'

const Product = ({ prdct }) => {
    return (
        <div>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${prdct._id}`}>
                    <Card.Img src={prdct.image} ></Card.Img>
                </Link>
                <Card.Body>
                    <Link to={`/product/${prdct._id}`}>
                        <Card.Title as="div"  >
                            <strong >{prdct.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as="div">
                        <div className='my-3'>
                            <Card.Text>                        
                                <Review value={prdct.rating} text={`${prdct.numReviews}reviews`}/>
                            </Card.Text>
                        </div>
                    </Card.Text>
                    <Card.Text as='h3'>
                        ${prdct.price}
                    </Card.Text>
                </Card.Body>

            </Card>

        </div>
    )
}

export default Product
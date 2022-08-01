import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form } from 'react-bootstrap'
import FormComponent from '../Components/FormComponent'
import { savePayment } from '../Actions/CartAction'
import CheckoutSteps from '../Components/CheckoutSteps'

const PaymentScreeen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [payment, setPayment] = useState('PayPal')


    const submitHandle = (e) => {
        e.preventDefault()
        dispatch(savePayment(payment))
        navigate("/placeorder")
    }
    return (
        <FormComponent>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandle}>
                <h1>Payment Method</h1>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label><br />
                    <Col>
                        <Form.Check type='radio' label="Paypal or Credit Card" checked
                            id="paypal" name='payment method' value='paypal'  onChange={e => setPayment(e.target.value)} >
                        </Form.Check>
                    </Col>
                    <Col>
                        {/* <Form.Check type='radio' label="Stripe"
                            id="stripe" name='payment method' value='stripe' onChange={e => setPayment(e.target.value)} >
                        </Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormComponent>
    )
}

export default PaymentScreeen
import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, NavLink, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { orderLists } from '../Actions/OrderAction'
import { getUserDetails, updateUserProfile } from '../Actions/userAction'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetail = useSelector((state) => state.userDetail)

    const { loading, error, user } = userDetail

    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    const updateUser = useSelector((state) => state.userUpdatedProfile)

    const { success } = updateUser 

    const myOrders = useSelector((state) => state.orderMyLists)

    const { loading:loadingOrders, error:orderErrors, Orders } = myOrders


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(orderLists())
            } else {    
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, dispatch, user, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password Do Not Match")
        } else {
          dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h1>user profile</h1>
                {message && <h3>{message}</h3>}
                {error && <h1>{error}</h1>}
                {loading && <h2>loading</h2>}
                {success && <h1>Profile Updated Successfully</h1>}
                <Form onSubmit={submitHandler} >
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='confirmPassword'>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ></FormControl>
                    </FormGroup>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9} >
                <h2>my orders</h2>
                {loadingOrders?<h2>loading....</h2>:orderErrors?<h3>{orderErrors}</h3>:(
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Orders.map(order=>(
                                <tr key={order._id}>
                                   <td>{order._id}</td>
                                   <td>{order.createdAt.substring(0,10)}</td>
                                   <td>{order.totalPrice}</td>
                                   <td>{order.isPaid?order.paidAt.substring(0,10):(
                                       <i className='fas fa-times' style={{color:"red"}} ></i>
                                   )}</td>
                                    <td>{order.isDelivered?order.isDelivered.substring(0,10):(
                                       <i className='fas fa-times' style={{color:"red"}} ></i>
                                   )}</td>
                                   <td>
                                       <LinkContainer to={`/order/${order._id}`} >
                                           <Button className='btn-sm' variant='light' >Details</Button>
                                       </LinkContainer>
                                   </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
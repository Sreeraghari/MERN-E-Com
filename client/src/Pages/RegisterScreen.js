import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormComponent from '../Components/FormComponent'
import { login, register } from '../Actions/userAction'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userReg = useSelector((state) => state.userRegister)

    const { loading, error, userInfo } = userReg

    const redirect = location.search ? location.search.split("=")[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [redirect, userInfo, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("PAssword Do Not Match")
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormComponent>
            <h1>Sign Up</h1>
            {message&&<h3>{message}</h3>}
            {error && <h1>{error}</h1>}
            {loading && <h2>loading</h2>}
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
                <Button type='submit' variant='primary' >Sign Up</Button>
            </Form>
            <Row>
                <Col>
                    Already  Have account?{<Link to={redirect ? `/login/redirect=${redirect}` : `/login`}>Login</Link>}
                </Col>
            </Row>
        </FormComponent>
    )
}

export default RegisterScreen
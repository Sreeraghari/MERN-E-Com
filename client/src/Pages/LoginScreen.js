import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation,useNavigate } from 'react-router-dom'
import FormComponent from '../Components/FormComponent'
import {login} from '../Actions/userAction'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const userlog=useSelector((state)=>state.userLogin)

    const {loading,error,userInfo}=userlog
    
    const redirect = location.search ? location.search.split("=")[1] : '/'
    console.log("value"+redirect)

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [redirect,userInfo,navigate])
    
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormComponent>
            <h1>Sign In</h1>
            {error&&<h1>{error}</h1>}
            {loading && <h2>loading</h2>}
            <Form onSubmit={submitHandler} >
                <FormGroup controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} ></FormControl>
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel>Email Password</FormLabel>
                    <FormControl type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} ></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary' >Sign In</Button>
            </Form>
            <Row>
                <Col>
                    New Customer?{<Link to={redirect ? `/register/redirect=${redirect}` : `/register`}>Register</Link>}
                </Col>
            </Row>
        </FormComponent>
    )
}

export default LoginScreen
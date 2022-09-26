import React, { useState, useEffect } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {
    const [first_name, setFirst_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo) {navigate('/')}
    }, [userInfo,navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(first_name, email, password))
        }}

    return (
        <FormContainer>
            <h1>Sign up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type='name' placeholder='Enter name' value={first_name} onChange={(e) => setFirst_name(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to="/login">Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
)}
export default RegisterScreen
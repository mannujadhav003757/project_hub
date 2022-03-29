import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Form,Button} from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
export default function Login() {
    const [show1,setShow1] = useState(false)
    const navigate= useNavigate()
    const [user,setUser] = useState({
        email:"",
        password:"",
    })

    const [emailErr,setEmailErr] = useState(false)
    const [passwordErr,setPasswordErr] = useState(false)

    const handleChange = (e) =>{
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
        setEmailErr(false)
        setPasswordErr(false)
    }

    const logIn = (e) =>{
        console.log(user)
        e.preventDefault()
        const eRegex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const pwdRegex=/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
        if (user.email === "" || !eRegex.test(user.email)) {
            setEmailErr(true)
            
        }
        else if (user.password === "" || !pwdRegex.test(user.password)) {
            setPasswordErr(true)   
        }
        else{
            setShow1(true)
            axios.post('http://localhost:8080/login',user,{ validateStatus: false }).then((res)=>{
                if (res.data.statusCode === 200) {
                    alert(res.data.message)
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    const user = res.data.data
                    const record = localStorage.setItem('token', res.data.data.token)
                    navigate('/dashboard')
    
                } else if (res.data.statusCode === 400)
                {
                    alert(res.data.message)
                }
                
                else {
                    alert(res.data.message)
                }       
            }).catch((err) => {
                alert(err)
            })

        }    
    }
  return <>
  <Header flag={show1} />
  <div className='container pl-4 col-sm-8 mt-4 mb-4' style={{height:"355px"}}>
       <h1 className='App'>Log In</h1>
       <Form>      
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
                {emailErr ? <p className="text-danger">** Enter Proper Email</p> :false}      
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleChange} />
                {passwordErr ? <p className="text-danger">** Enter Proper Format of Password</p> :false} 
            </Form.Group>
            
            <Button variant="primary" style={{ marginLeft: "300px" }} onClick={logIn}>
                Log In
            </Button>
            <Button variant="primary" style={{ marginLeft: "100px" }}>
                Cancel
            </Button>
        </Form>
  </div>
  <Footer />
  </>
}

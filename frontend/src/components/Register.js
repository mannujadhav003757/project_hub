import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
export default function Register() {
    const navigate=useNavigate()
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confPass: ""
    })

    const [ferr, setFerr] = useState(false)
    const [lerr, setLerr] = useState(false)
    const [emailerr, setEmailerr] = useState(false)
    const [pwderr, setpwdErr] = useState(false)
    const [cpwderr, setCpwderr] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
        setFerr(false)
        setLerr(false)
        setEmailerr(false)
        setpwdErr(false)
        setCpwderr(false)
    }
    console.log(user)

    const register = (e) => {
        e.preventDefault()
        const fRegex = /^[a-zA-Z]+$/
        const lRegex = /^[a-zA-Z]+$/
        const eRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const pwdRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/

        if (user.fname === "" || !fRegex.test(user.fname)) {
            setFerr(true)
        }
        else if (user.lname === "" || !lRegex.test(user.lname)) {
            setLerr(true)
            
        }
        else if (user.email === "" || !eRegex.test(user.email)) {
            setEmailerr(true)
            
        }
        else if (user.password === "" || !pwdRegex.test(user.password)) {
            setpwdErr(true)   
        }
        else if (user.confPass === "" || user.password !== user.confPass) {
            setCpwderr(true)
        }
        else{
            const { fname, lname, email, password,confPass } = user
        if (fname && lname && email && password && confPass && (password === confPass)) {
            return axios.post('http://localhost:8080/register', user, { validateStatus: false }).then((res) => {

                if (res.data.statusCode === 201) {
                    alert(res.data.message)
                    navigate('/')

                } else if(res.data.statusCode === 400) {
                    alert(res.data.message)
                }else{
                    alert(res.data.message)
                }

            }).catch((err) => {
                alert(err)
            })
        }
        else {
            alert('invalid input, please try again')
        }
    }
        

    }

    return <>
    <Header />
     <div className='container pl-4 col-sm-8 mt-4 mb-4'>
        <h1 className='App'>Sign Up</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicfname">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" name="fname" value={user.fname} onChange={handleChange} />
               { ferr ? <p style={{color:"red"}}>**Enter Valid First Name</p> : false}   
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasiclname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" name="lname" value={user.lname} onChange={handleChange} />
                { lerr ? <p style={{color:"red"}}>**Enter Valid Last Name</p> : false}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
                { emailerr ? <p style={{color:"red"}}>**Enter Valid Email</p> : false}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleChange} />
                { pwderr ? <p style={{color:"red"}}>**Enter Valid Format of Password</p> : false}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="confPass" value={user.confPass} onChange={handleChange} />
                { cpwderr ? <p style={{color:"red"}}>**Password did not matched</p> : false}
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginLeft: "300px" }} onClick={register}>
                Submit
            </Button>
            <Button variant="primary" style={{ marginLeft: "100px" }}>
                Cancel
            </Button>
        </Form>
    </div>
    <Footer />
    </>
}

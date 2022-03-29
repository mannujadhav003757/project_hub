import React, { useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Header(props) {
    const navigate = useNavigate()
    const [show,setShow] = useState(true)
    const [show1,setShow1] = useState(false)
    console.log("||||||||||",props.flag)
    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(token)
        {
            setShow1(true)
            setShow(false)
        }
        else
        {
            setShow1(false)
            setShow(true)
        }
     })
    const logOut = () =>{
        const token = localStorage.getItem('token')
        if(token)
        {
        localStorage.removeItem('token');
        alert("log Out sucessfully")
        navigate('/')
        }
        else{
            alert("User Already Logged Out Please Log in")
            navigate('/')

        }
    }
    const goToDash = () =>{
       // alert("function called")
        setShow1(props.flag)
        navigate('/dashboard')
    }
    return <div>
        <Navbar bg="secondary" variant="dark">
            <div className='container'> 
            <Navbar.Brand href="#home" style={{color:"gold"}}><b>Project Hub</b></Navbar.Brand>
            <div className='col-sm-7'></div>
                <Nav className="me-auto">
               {show1 ?     <Nav.Link onClick={goToDash}>Dashboard</Nav.Link> :false }
                    <div className='col-sm-2 '></div>
                { show ?   <Nav.Link href="/">LogIn</Nav.Link> : false }
                    <div className='col-sm-2'></div>
                { show ?     <Nav.Link href="/register ">SignUp</Nav.Link> : false }
                    <div className='col-sm-2'></div>
                { show1 ?      <Nav.Link onClick={logOut}>LogOut</Nav.Link> :false}
                </Nav>
                </div>  
        </Navbar>
    </div>;
}


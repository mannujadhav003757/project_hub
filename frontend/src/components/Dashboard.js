import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import { Nav, Card, Button, Modal, Form } from "react-bootstrap"
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionAns from './QuestionAns';
export default function Dashboard() {
    const navigate = useNavigate()
    const [record, setRecord] = useState([])
    const [technology,setTechnology] = useState('')
    const [id, setId] = useState('')
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [warning, setWarning] = useState(false)
    const[projectData,setProjectData]=useState()
    const[hide,setHide] = useState(false)
    const user1 = JSON.parse(localStorage.getItem('user'))
    const pname = React.useRef()
    const rlink = React.useRef()

    const [allProjects, setAllProjects] = useState([])
    const [myProjects, setMyProjects] = useState([])
    const [otherProjects, setOtherProjects] = useState([])

    const [projectDetails, setProjectDetails] = useState({
        user_id: user1._id,
        project_name: '',
        project_repo_link: '',
        technology: ''
    })
    const [updateProjectDetails, setUpdateProjectDetails] = useState({
        _id: id,
        user_id: user1._id,
        project_name: '',
        project_repo_link: '',
        technology: ''
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setUpdateProjectDetails({
            ...updateProjectDetails,
            [name]: value,
            _id: id

        })

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setProjectDetails({
            ...projectDetails,
            [name]: value,

        })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/getAllProject').then(res => {

            const temp = res.data.data
            setAllProjects(res.data.data)

            const tempMyProject = temp.filter(el => el.user_id === user1._id)
            setMyProjects(tempMyProject)


            const tempOtherProject = temp.filter(el => el.user_id !== user1._id)
            setOtherProjects(tempOtherProject)


            setRecord(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    },[])






    const handleClose = () => {
        axios.post('http://localhost:8080/addproject', projectDetails, { validateStatus: false }).then((res) => {
            if (res.data.statusCode === 200) {
                console.log('%%%%%%%%%%%%%', res.data.data)
                setRecord(res.data)
                alert(res.data.message)
                navigate('/dashboard')
                window.location.reload();

            } else {
                alert(res.data.message)
            }
        }).catch((err) => {
            alert(err)
        })

        setShow(false);
    }

    const handleShow = () => setShow(true);


    const allProject = () => {
        setRecord(allProjects)
        if (allProjects.length < 0) {
            setWarning(true)
        }
        else {
            setWarning(false)
        }
    }

    const myProject = () => {
        setRecord(myProjects)
        if (myProjects.length < 0) {
            setWarning(true)
        }
        else {
            setWarning(false)
        }
    }

    const otherProject = () => {
        setRecord(otherProjects)
        if (otherProjects.length < 0) {
            setWarning(true)
        }
        else {
            setWarning(false)
        }
    }

    const handleClose1 = () => setShow1(false);

    const updateRecord = (item) => {
        //setTechnology(item.technology)
        setUpdateProjectDetails({
            _id: id,
        user_id: user1._id,
        project_name: item.project_name,
        project_repo_link: item.project_repo_link,
        technology: item.technology
        })

        if(item.user_id===user1._id)
        {
        console.log(item)
        setId(item._id)
        setShow1(true);
        console.log("#####", updateProjectDetails)
        }
        else
        {
            alert("user is not valid user")
        }

    }

    const updateProject = () => {
        console.log("******", updateProjectDetails)
        let data = {
            project_name: updateProjectDetails.project_name,
            project_repo_link: updateProjectDetails.project_repo_link,
            technology: updateProjectDetails.technology,
            user_id: updateProjectDetails.user_id
        }
        axios.put('http://localhost:8080/updateProject/' + updateProjectDetails._id, data).then((res) => {
            if (res.data.statusCode === 200) {
                alert(res.data.message)
                navigate('/dashboard')
                window.location.reload();

            } else {
                alert(res.data.message)
            }
        }).catch((err) => {
            alert(err)
        })
    }

    const deleteRecord = (item) => {
        if(item.user_id===user1._id){

          console.log(item)
        const token = localStorage.getItem('token')
        const data = {
            _id: item._id
        }

        axios.delete('http://localhost:8080/deleteProject', {
            headers: {
                Authorization: token
            },
            data: {
                _id: item._id
            }
        }).then((res) => {
            if (res.data.statusCode === 200) {
                alert(res.data.message)
                navigate('/dashboard')
                window.location.reload();

            } else {
                alert(res.data.message)
            }
        }).catch((err) => {
            alert(err)
        })
    }
    else
    {
        alert("user is not valid")
    }

    }

    const updateQuestion = (item) =>{
        alert("function calling")
        //console.log(item)
        setProjectData(item)
        localStorage.setItem('pdata', JSON.stringify(item))
        //console.log("====",x)
        navigate('/QansForum')
    }



    return <>
        <Header />
        <div>
        <div className='container-fluid mt-5 mb-5'>
            <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={allProject}>All Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={myProject}>My Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={otherProject}>Other Candidate Projects</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
        <div className='container'>
            <Button className='col-sm-12' variant="danger" onClick={handleShow}>Add A project</Button>
        </div>
        <div className='container-fluid mt-5 mb-5'>
            <div className='row'>
                {record.map((item) => <div className='col-sm-3 ml-4 mb-2'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title><b style={{ color: "royalblue" }}>Project Name: </b> {item.project_name}</Card.Title>
                            <Card.Text>
                                <span><b style={{ color: "red" }}>Repository Link:</b></span><br />
                                <a href={item.project_repo_link} >{item.project_repo_link}</a><br /><br />
                                <span><b style={{ color: "green" }}>Technology:</b></span><br />
                                {item.technology}
                            </Card.Text>
                            <Button variant="primary" onClick={() => updateQuestion(item)}>Q & A</Button>
                            <Button variant="warning" style={{ marginLeft: "5px" }} onClick={() => updateRecord(item)} >Update</Button>
                            <Button variant="danger" style={{ marginLeft: "5px" }} onClick={() => deleteRecord(item)} >Delete</Button>
                        </Card.Body>
                    </Card>
                </div>)}

            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add A Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Project Name" name="project_name" value={projectDetails.project_name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Repository Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter Repository Link" name="project_repo_link" value={projectDetails.project_repo_link} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Technologies:</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="radio"  value='html' name="technology" label="Html" onClick={handleChange} />
                        <Form.Check type="radio"  value='css' name="technology" label="Css" onClick={handleChange} />
                        <Form.Check type="radio"  value='javascript' name="technology" label="JavaScript" onClick={handleChange} />
                        <Form.Check type="radio" value='reactjs' name="technology" label="ReactJs" onClick={handleChange} />
                        <Form.Check type="radio"  value="nodejs" name="technology" label="NodeJs" onClick={handleChange} />
                    </Form.Group>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" href="/dashboard" onClick={handleClose}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
                <Modal.Title>Update Project</Modal.Title>
            </Modal.Header>
            <Modal.Body><Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project Name:</Form.Label>
                    <Form.Control type="text" ref={pname}  placeholder="Enter Project Name" name="project_name" value={updateProjectDetails.project_name} onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Repository Link</Form.Label>
                    <Form.Control type="text"  placeholder="Enter Repository Link" name="project_repo_link" value={updateProjectDetails.project_repo_link} onChange={handleInput} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Technologies:</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    {/* <Form.Check type="radio" value='html' name="technology" label="Html" onClick={handleInput} />
                    <Form.Check type="radio" value='Css' name="technology" label="Css" onClick={handleInput} />
                    <Form.Check type="radio" value='JavaScript' name="technology" label="JavaScript" onClick={handleInput} />
                    <Form.Check type="radio" value='ReactJs' name="technology" label="ReactJs" onClick={handleInput} />
                    <Form.Check type="radio" value="nodeJs" name="technology" label="NodeJs" onClick={handleInput} /> */}


                    <Form.Check type="radio" checked={updateProjectDetails.technology=='html'} value='html' name="technology" label="Html" onClick={handleInput} />
                        <Form.Check type="radio" checked={updateProjectDetails.technology=='css'} value='css' name="technology" label="Css" onClick={handleInput} />
                        <Form.Check type="radio" checked={updateProjectDetails.technology=='javascript'} value='javascript' name="technology" label="JavaScript" onClick={handleInput} />
                        <Form.Check type="radio" checked={updateProjectDetails.technology=='reactjs'} value='reactjs' name="technology" label="ReactJs" onClick={handleInput} />
                        <Form.Check type="radio" checked={updateProjectDetails.technology=='nodejs'} value="nodejs" name="technology" label="NodeJs" onClick={handleInput} />
                </Form.Group>

            </Form></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateProject}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

        {warning ? <div style={{ height: "250px" }}>
            <h1>Projects Not Available</h1>
        </div> : false}
        </div>
        {hide ? <QuestionAns prodata={projectData} />:false }
        <footer>
        <Footer />
        </footer>
    </>
}

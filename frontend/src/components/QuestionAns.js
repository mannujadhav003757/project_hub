import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { FormControl, InputGroup, Card, Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function QuestionAns(prop) {
    const navigate = useNavigate()
    const [hideButton,setHideButton] =useState(true)
    const [rerender, setRerender] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false)
    const [record, setRecord] = useState([])
    const [showAnswer, setShowAnswer] = useState(false)
    const pdata = JSON.parse(localStorage.getItem('pdata'))
    const user1 = JSON.parse(localStorage.getItem('user'))
    const Qid = localStorage.getItem('Qid')
    const [data, setData] = useState([])
    const [id, setId] = useState()
    console.log("@@@@@@@", user1)
    console.log("+++++++", pdata)
    console.log(pdata.project_name)

    const QuestionBox = () => {
        setShowQuestion(true)
        setHideButton(false)
    }

    const [questionDetails, setQuestionDetails] = useState({
        user_id: user1._id,
        user_name: user1.fname + " " + user1.lname,
        project_id: pdata._id,
        question: ""
    })

    
    const fetchdata = async (item) => {
        //console.log(";;;;;;;;;;;;",item)
        await setId(item._id)
        console.log("----------", answerDetails)
        var data = answerDetails
        data.question_id=item._id

        axios.post('http://localhost:8080/addanswer', data, { validateStatus: false }).then((res) => {
            if (res.data.statusCode === 200) {
                console.log('%%%%%%%%%%%%%', res.data.data)
                navigate('/QansForum')
                alert(res.data.message)
               
                //setShowQuestion(false)

            } else {
                alert(res.data.message)
            }
        }).catch((err) => {
            alert(err)
        })

        axios.get('http://localhost:8080/getanswer').then(res => {
            console.log(res.data.data)
            const temp = res.data.data
            
            const tempMyAnswer = temp.filter(el => el.question_id === id)
            setData(tempMyAnswer)
            navigate('/QansForum')


        }).catch(err => {
            console.log(err)
        })



    }

    const [answerDetails, setAnswerDetails] = useState({
        question_id: Qid,
        user_id: user1._id,
        project_id: pdata._id,
        answer: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setAnswerDetails({
            ...answerDetails,
            [name]: value,
            

        })
        console.log(answerDetails.answer)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setQuestionDetails({
            ...questionDetails,
            [name]: value,
            question_id: id,
        })
    }

    const addQuestion = () => {
        console.log(questionDetails)
        axios.post('http://localhost:8080/addquestion', questionDetails, { validateStatus: false }).then((res) => {
            if (res.data.statusCode === 200) {
                console.log('%%%%%%%%%%%%%', res.data.data)
                alert(res.data.message)
                navigate('/QansForum')
                setShowQuestion(false)

            } else {
                alert(res.data.message)
            }
        }).catch((err) => {
            alert(err)
        })
    }
    useEffect(() => {
        axios.get('http://localhost:8080/getquestion').then(res => {
            console.log(res.data.data)
            const temp = res.data.data
            localStorage.setItem('Qid',res.data.data._id)
            const tempMyProject = temp.filter(el => el.project_id === pdata._id)
            setRecord(tempMyProject)


        }).catch(err => {
            console.log(err)
        })

        axios.get('http://localhost:8080/getanswer').then(res => {
            console.log(res.data.data)
            const temp = res.data.data
            
            //const tempMyAnswer = temp.filter(el => el.question_id === id)
            setData(res.data.data)


        }).catch(err => {
            console.log(err)
        })

        setRerender(!rerender);
    }, [])

    const giveAnswer = () => {
        setShowAnswer(true)
    }

    return (
        <>
            <Header />
        
            <h1 className='App'>Question Forum</h1>
            <div className='container-fluid mt-4 mb-4'>
                <Card>
                    <Card.Header>Project Detail</Card.Header>
                    <Card.Body>
                        <Card.Title>Project Name: <span style={{ color: "red" }}>{pdata.project_name}</span></Card.Title>
                        <Card.Text>
                            <b>Project link:</b> <a href={pdata.project_repo_link}> {pdata.project_repo_link}</a>
                        </Card.Text>
                        <Card.Text>
                            <b>Project technology:</b> {pdata.technology}
                        </Card.Text>
                     { hideButton ?   <Button variant="primary" onClick={QuestionBox}>Raise Question</Button> :false }
                    </Card.Body>
                </Card>
            </div>

            {showQuestion ? <div className='container mt-4'>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter A Question"
                        aria-label="Question"
                        aria-describedby="basic-addon2"
                        name="question"
                        value={questionDetails.question}
                        onChange={handleInput}
                    />
                    <Button href="/QansForum" onClick={addQuestion}>Post Question</Button>
                </InputGroup>

            </div> : false}
            {record.map((item) =>
                <div className='container mb-4 mt-4'>
                    <Card>
                        <Card.Header><b style={{color:"blue"}}>{item.user_name}</b></Card.Header>
                        <Card.Body>
                            <Card.Title><b style={{color:"red"}}>Q. </b> {item.question}</Card.Title>
                            {/* <Button variant="primary" onClick={giveAnswer}>Answer</Button> */}
                        </Card.Body>
                    </Card>
                    <div className='container mt-4'>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter A Answer"
                                aria-label="Question"
                                aria-describedby="basic-addon2"
                                name="answer"
                                value={answerDetails.answer}
                                onChange={handleChange}
                            />
                            <Button href='/QansForum'  onClick={() => fetchdata(item)}>Post Answer</Button>
                        </InputGroup>
               { data.map(item =>
                <Card>
                            <Card.Body><b style={{color:"green"}}>Ans. </b> {item.answer}</Card.Body>
                        </Card>)}
                    </div>        


                </div>
            )}
            <footer style={{marginTop:"110px"}}> <Footer /></footer>
            
        </>
    )
}

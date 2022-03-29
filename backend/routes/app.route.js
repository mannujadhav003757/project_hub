//const verifyUser = require('../middelware/auth.middleware')
const projectSchema = require('../model/project.schema')

const routes = (app) => {
    const User = require('../controller/user.controller') //importing user controller
    const Project = require('../controller/project.controller') //importing project controller
    const Question = require('../controller/question.controller')
    const Answer = require('../controller/answer.controller')
    // app.use(verifyUser)

    app.post('/register', User.register)  //route for register new user

    app.post('/login', User.login) //route for log in user

    app.post('/addproject',  Project.createProject) //route for create new project
    
    app.get('/getAllProject', Project.getAllProject) //route for get all project

    app.delete('/deleteProject',Project.deleteProject) //route for delete single project

    app.put('/updateProject/:id',Project.updateProject) //route for update single project

    app.post('/addquestion', Question.addquestion)  

    app.get('/getquestion', Question.getQuestion)

    app.post('/addanswer', Answer.addanswer)
    
    app.get('/getanswer', Answer.getanswer)


    
}

module.exports = routes
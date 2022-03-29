const Question = require('../model/question.schema')

exports.addquestion = async (req, res) => {
    try {
        const tempQuestion = req.body

        if (!tempQuestion) {
            return res.status(400).send({
                'message': 'unable to add Question, please try again',
                'statusCode': 400
            })
        }

        const question = new Question(tempQuestion)

        await question.save()

        return res.status(201).send({
            'message': 'question added successfully',
            'statusCode': 201
        })

    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })
    }
}

exports.getQuestion = async (req, res) => {
    
    const  question =await Question.find()
    if(!question)
    {
        return res.status(400).send({
                'message': 'question not found',
                 'statusCode': 400 
        })
    }
    else{
        return res.status(200).send({
                    'message': 'ok',
                    'statusCode': 200,
                     'data': question
                        
        })
    }

}


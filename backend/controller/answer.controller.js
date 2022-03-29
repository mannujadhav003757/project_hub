const Answer = require('../model/answer.schema')

// exports.addanswer = async (req, res) => {
//     try {
//         const tempAnswer = req.body

//         if (!tempAnswer) {
//             return res.status(400).send({
//                 'message': 'unable to add Question, please try again',
//                 'statusCode': 400
//             })
//         }

//         const answer = new Answer(tempAnswer)

//         await answer.save()

//         return res.status(201).send({
//             'message': 'Answer added successfully',
//             'statusCode': 201
//         })

//     } catch (e) {
//         return res.status(400).send({
//             'message': 'something went wrong, please try again.',
//             'statusCode': 400
//         })
//     }
// }

exports.addanswer = async (req, res) => {
    try {
        const tempAnswer = req.body
        //console.log(tempAnswer)
        if (!tempAnswer) {
            return res.status(400).send({
                'message': 'unable to add Answer, please try again',
                'statusCode': 400
            })
        }

        const ans = new Answer(tempAnswer)
        console.log(ans)

        await ans.save()

        return res.status(201).send({
            'message': 'Answer added successfully',
            'statusCode': 201
        })

    } catch (e) {
        console.log(e)
        return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })
    }
}

exports.getanswer = async (req, res) => {
    
    const  answer =await Answer.find()
    if(!answer)
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
                     'data': answer
                        
        })
    }

}

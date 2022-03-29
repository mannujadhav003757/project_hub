const User = require('../model/user.schema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let { fname, lname, email, password} = req.body

    try {

        let user = await User.findOne({ email })
    
        if (user) {
            return res.status(400).send({
                'message': 'user already exist, please try again.',
                'statusCode': 400
            })
        }
    
        const salt = await bcrypt.genSalt(10)
    
        password = await bcrypt.hash(password, salt)
    
        user = new User({
            fname, lname, email, password
        })
    
        await user.save()
    
        return res.status(201).send({
            'message': 'user registered successfully, please login.',
            'statusCode': 201
        })

    } catch(e) {
        console.log(e)
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(401).send({
                'message': 'Invalid email, please try again',
                'statusCode': 401
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).send({
                'message': 'Invalid password, please try again',
                'statusCode': 401
            })
        }

        const token = jwt.sign({ _id: user.id.toString() }, "productHub")

        user.token = token

        await user.save()

        delete user._doc.password
        delete user._doc.__v

        return res.status(200).send({
            'message': 'login successful',
            'statusCode': 200,
            'data': user
        })

    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}

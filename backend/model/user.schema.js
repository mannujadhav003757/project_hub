const mongoose = require('mongoose')
//schema for user
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        max: 25,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: "Please enter valid first name"
        }
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        max: 25,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: "Please enter valid last name"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v)
            },
            message: "Please enter valid email"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(v)
            },
            message: "Please enter valid password"
        }
    },
    
    token: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose')
//schema for products
const questionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    project_id: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Question',questionSchema);
const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    question_id:{
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    project_id: {
        type: String,
        required: true
    },
    
    answer:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Answer',answerSchema);
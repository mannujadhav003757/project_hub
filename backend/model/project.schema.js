const mongoose = require('mongoose')
//schema for products
const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    project_repo_link: {
        type: String,
        required: true
    },
    technology: {
        type: String,
        required: true
    },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Project',projectSchema);
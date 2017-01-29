const mongoose = require('../database');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    htmlCode: String,
    cssCode: String,
    type: String
});

module.exports = mongoose.model('Task', TaskSchema);

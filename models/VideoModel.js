const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoModel = new Schema({
    title: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
    background: {
        type: String,
        require: true,
    },
    singers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Singer', 
        }
    ],
    kind: {
        type: String,
        require: true,
    },
    original: {
        type: String,
        require: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('Video', videoModel);
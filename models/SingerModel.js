const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const singerSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    }
    ,
    avatar: {
        type: String,
        required: true,
    }
    ,
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
    gender: {
        type: String,
        required: true,
    }
    ,
    introduce: {
        type: String,
        required: true,
    }
    ,
    music: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Music',
            required: true,
        }
    ]
    ,
})

const singerModel = mongoose.model('Singer', singerSchema);

module.exports = singerModel;

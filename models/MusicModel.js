const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const musicSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    singer: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    poster: {
        type: String,
    },
    views: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    kind: {
        type: String,
        required:  true,
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('Music', musicSchema);

module.exports = userModel;
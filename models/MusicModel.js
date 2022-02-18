const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    idSinger: {
        type: Schema.Types.ObjectId,
        ref: 'Singer',
        required: true,
    },
    subtitle: {
        type: String,
    },
    subtitlePoster: [
        {
            idPoster: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            content: {
                type: String,
            }
        }
    ],
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userChema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        required: true,
    },
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
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    identityCard: {
        type: Number,
    },
    introduce: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    playlists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Playlist'
        }
    ],
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userChema);

module.exports = userModel;
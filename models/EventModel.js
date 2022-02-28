const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    playlists: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Playlist',
        }
    ],

}, {
    timeupdate: true,
})

module.exports = mongoose.model('Event', eventSchema);

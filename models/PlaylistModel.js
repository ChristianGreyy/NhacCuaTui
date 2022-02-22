const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    }
    ,
    kind: {
        type: String,
        required: true,
    },
    musics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Music',
        }        
    ]
})

module.exports = mongoose.model('Playlist', playlistSchema);
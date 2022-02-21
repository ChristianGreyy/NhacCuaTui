const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
    musics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Music',
        }        
    ]
})

module.exports = mongoose.model('Playlist', playlistSchema);
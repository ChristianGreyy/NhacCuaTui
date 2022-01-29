const Music = require('../models/MusicModel');

exports.getNewMusic = (req, res, next) => {
    res.render('music/newMusic', {
        pageTitle: 'Bài hát mới',
        errorMessage: false,
    });
}

exports.getMusic = (req, res, next) => {
    let musicId = req.params.musicId;
    Music.findById(musicId)
    .then(music => {
        if(!music) {
            console.log('Music not found');
            res.redirect('/');
        }
        return Music.find({singer: music.singer})
        .then(musics => {
            console.log(musics)
            res.render('music/music', {
                pageTitle: 'Bước qua mùa cô đơn - vũ',
                errorMessage: false,
                music,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
}
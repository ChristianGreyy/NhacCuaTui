const Music = require('../models/MusicModel');

exports.getNewMusic = (req, res, next) => {
    Music.find({})
    .then(musics => {
        res.render('music/newMusic', {
            pageTitle: 'Bài hát mới',
            errorMessage: false,
            musics: musics,
        });
    })
    .catch(err => {
        console.log(err);
    })
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

exports.getYoungMusic = (req, res, next) => {
    Music.find({kind: 'young'})
    .then(musics => {
        res.render('music/generalMusic.ejs', {
            pageTitle: 'Nhạc Trẻ mới',
            errorMessage: false,
            musics,
        });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getRomanticMusic = (req, res, next) => {
    Music.find({kind: 'romantic'})
    .then(musics => {
        res.render('music/generalMusic.ejs', {
            pageTitle: 'Nhạc Trữ Tình mới',
            errorMessage: false,
            musics,
        });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getRemixMusic = (req, res, next) => {
    Music.find({kind: 'vietnameseRemix'})
    .then(musics => {
        res.render('music/generalMusic.ejs', {
            pageTitle: 'Nhạc Remix Việt mới',
            errorMessage: false,
            musics,
        });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getVietnameseRapMusic = (req, res, next) => {
    Music.find({kind: 'vietnameseRap'})
    .then(musics => {
        res.render('music/generalMusic.ejs', {
            pageTitle: 'Nhạc Rap Việt mới',
            errorMessage: false,
            musics,
        });
    })
    .catch(err => {
        console.log(err);
    })
}
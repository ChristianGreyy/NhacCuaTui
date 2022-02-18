const Music = require('../models/MusicModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

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
    .populate('poster')
    .then(music => {
        if(!music) {
            console.log('Music not found');
            res.redirect('/');
        }
        return Music.find({singer: music.singer})
        .then(musics => {
            let idPoster = '';
            let username = '';
            if(music.poster) {
                idPoster = music.poster._id;
                username = music.poster.username;
            } 
            // let idPoster = music.poster._id ? music.poster._id : '';
            res.render('music/music', {
                pageTitle: music.name,
                errorMessage: false,
                errorNotFound: req.flash('notFoundUser')[0],
                music,
                musics,
                poster: {
                    id: idPoster,
                    username: username,
                }
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

exports.createSubtitleMusic = async (req, res, next) => {
   try {
    let idMusic = req.params.musicId;
    const { idPoster, content } = req.body;
    if(typeof idMusic === String) {
        idPoster = mongoose.Schema.Types.ObjectId(idMusic);
    }
    const user = await User.findOne({_id: idPoster});
    if(!user) {
        req.flash('notFoundUser', 'Bạn chưa đăng nhập, vui lòng đăng nhập');
        return res.status(404).redirect(`/bai-hat/${idMusic}`)
    }
    const music = await Music.findOne({_id: idMusic});
    if(!music) {
        const error = new Error('Not found music');
        error.statusCode = 404;
        throw error;
    }
    let subtitlePoster = {
        idPoster,
        content,
    }
    music.subtitlePoster.push(subtitlePoster)
    const result = music.save();
    res.redirect(`/bai-hat/${idMusic}`)
   } catch(err) {
       console.log(err);
       const error = new Error('error server');
       error.statusCode = 500;
       throw error;
   }
}
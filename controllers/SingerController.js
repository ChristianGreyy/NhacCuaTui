const Singer = require('../models/SingerModel');

exports.getSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger})
        .populate('musics')
        res.render('singer/personalSinger', {
            pageTitle: 'Ca sĩ ' + singer.fullname,
            singer,
            errorMessage: false,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.getMusicSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger})
        .populate('musics')
        res.render('singer/musicSinger', {
            pageTitle: 'Bài hát của ' + singer.fullname,
            singer,
            errorMessage: false,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.getPlaylistSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger})
        .populate('musics')
        res.render('singer/playlistSinger', {
            pageTitle: 'Playlist của ' + singer.fullname,
            singer,
            errorMessage: false,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.getVideoSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger})
        .populate('musics')
        res.render('singer/musicSinger', {
            pageTitle: 'Video của ' + singer.fullname,
            singer,
            errorMessage: false,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.getKaraokeSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger})
        .populate('musics')
        res.render('singer/musicSinger', {
            pageTitle: 'Karaoke của ' + singer.fullname,
            singer,
            errorMessage: false,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.getBeatSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger})
        .populate('musics')
        res.render('singer/musicSinger', {
            pageTitle: 'Beat của ' + singer.fullname,
            singer,
            errorMessage: false,
        })
    } catch(err) {
        console.log(err);
    }
}
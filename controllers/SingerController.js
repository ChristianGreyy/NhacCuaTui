const Singer = require('../models/SingerModel');

exports.getSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger})
        .populate('musics')
        // .populate('playlists')

        const playlists = [];
        const checkId = [];

        for(let i in singer.musics) {
            const musicDoc = await singer.musics[i].populate('playlists');
            musicDoc.playlists.forEach(playlist => {
                if(checkId.indexOf(playlist._id.toString()) == -1) {
                    playlists.push(playlist);
                    checkId.push(playlist._id.toString());
                }
            })
        }

        res.render('singer/personalSinger', {
            pageTitle: 'Ca sĩ ' + singer.fullname,
            singer,
            playlists,
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

        const playlists = [];
        const checkId = [];

        for(let i in singer.musics) {
            const musicDoc = await singer.musics[i].populate('playlists');
            musicDoc.playlists.forEach(playlist => {
                if(checkId.indexOf(playlist._id.toString()) == -1) {
                    playlists.push(playlist);
                    checkId.push(playlist._id.toString());
                }
            })
        }

        res.render('singer/playlistSinger', {
            pageTitle: 'Playlist của ' + singer.fullname,
            singer,
            playlists,
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
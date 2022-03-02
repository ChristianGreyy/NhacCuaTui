const Music = require('../models/MusicModel');
const User = require('../models/UserModel');
const Playlist = require('../models/PlaylistModel');
const Singer = require('../models/SingerModel');
const Video = require('../models/VideoModel');
const mongoose = require('mongoose');

exports.getNewMusic = async (req, res, next) => {
    // console.log(req.originalUrl)
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({})
        .populate('singers')
        .then(musics => {
            // console.log(musics[0].singers)
            res.render('music/generalMusic', {
                pageTitle: 'Bài hát mới',
                errorMessage: false,
                musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getNewPlaylist = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }

            // const music = playlists[0].musics[0].populate('singers');
            // console.log(playlists)
            res.render('playlist/newPlaylist', {
                pageTitle: 'Playlist mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
                singers
            })
        } catch(err) {
            console.log(err);
        }
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getNewVideolist = async (req, res, next) => {
    // console.log(req.originalUrl)
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
      
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        let musicId = req.params.musicId;
        if(musicId.length != 24) {
            return res.render('error/404', {
                pageTitle: 'Không tìm thấy trang', 
                errorMessage: false,
            });
        }
        const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.findById(musicId)
        .populate('singers')
        .populate('poster')
        .then(music => {
            if(!music) {
                return res.render('error/404', {
                    pageTitle: 'Không tìm thấy trang', 
                    errorMessage: false,
                });
            }
            // console.log(music)
            return Music.find({singers: music.singers[0]._id})
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
                    musics: musics,
                    errorNotFound: req.flash('notFoundUser')[0],
                singers,
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
    }  else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            const idPlaylist = req.params.musicId;
            if(idPlaylist.length != 24) {
                return res.render('error/404', {
                    pageTitle: 'Không tìm thấy trang', 
                    errorMessage: false,
                });
            }
            const playlist = await Playlist.findOne({_id: idPlaylist}).populate('musics');
            if(!playlist) {
                return res.render('error/404', {
                    pageTitle: 'Không tìm thấy trang', 
                    errorMessage: false,
                });
            }
            const playlists = await Playlist.find({});
            const nameArray = [];
            const idArray = [];
            const playlistArray = [];

            for(let i in playlist.musics) {
                let nameString = "";
                let idString = "";
                const musicDoc = await playlist.musics[i].populate('singers');

                for(let j in playlist.musics[i].singers) {
                    let check = true;
                    if(nameString.search(playlist.musics[i].singers[j].fullname) == -1) {
                        nameString += playlist.musics[i].singers[j].fullname.concat(',');
                        idString += playlist.musics[i].singers[j]._id.toString().concat(',');
                    }
                }
                nameArray.push(nameString);
                idArray.push(idString);
            }

            return res.render('playlist/playlist', {
                playlist,
                pageTitle: playlist.title,
                singers,
                errorMessage: false,
                errorNotFound: req.flash('notFoundUser')[0],
                nameSinger: nameArray,
                idSinger: idArray,
                playlists,
            })
        } catch(err) {
            console.log(err);
        }


    } else if(url === 'video') {
        const idVideo = req.params.musicId;
        if(idVideo.length != 24) {
            return res.render('error/404', {
                pageTitle: 'Không tìm thấy trang', 
                errorMessage: false,
            });
        }
        const video = await Video.findOne({_id: idVideo}).populate('singers');
        if(!video) {
            return res.render('error/404', {
                pageTitle: 'Không tìm thấy trang', 
                errorMessage: false,
            });
        }
        let singersArray = [];
        for(let i in video.singers) {
            singersArray.push(video.singers[i]);
        }
        const videos = await Video.find({}).populate('singers');
        return res.render('video/video.ejs', {
            pageTitle: 'Video',
            errorMessage: false,
            errorNotFound: req.flash('notFoundUser')[0],
            video,
            singersArray,
            videos,
        })
    } else {
        return res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getYoungMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'young'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Trẻ mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
    .catch(err => {
        console.log(err);
    })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'young'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
        
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Trẻ mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
       
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'young'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Trẻ mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getRomanticMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'romantic'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Trữ Tình mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'romantic'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
        
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Trữ Tình mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'romantic'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Trữ Tình mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getRemixMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'vietnameseRemix'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Remix Việt mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    }else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'vietnameseRemix'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
        
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Remix Việt mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getVietnameseRapMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'vietnameseRap'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Rap Việt mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    }else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'vietnameseRap'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Rap Việt mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'vietnameseRap'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Rap Việt mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getWarMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'war'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Tiền Chiến mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    }else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'war'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Tiền Chiến mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getvietnameseRockMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'vietnameseRock'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Rock Việt mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'vietnameseRock'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Rock Việt mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getTrinhMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'getTrinhMusic'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Trịnh mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'getTrinhMusic'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Trịnh mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getRevolutionMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'revolution'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Cách Mạng mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'revolution'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Cách Mạng mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'revolution'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Cách Mạng mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getPopMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'pop'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Pop mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'pop'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Pop mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'pop'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Pop mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
} 
exports.getUsUkRockMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'usUkRock'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Rock mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'usUkRock'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Rock mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
       
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'usUkRock'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Rock mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getElectronicaMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'electronica'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Electronica/Dance mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'electronica'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Electronica/Dance mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'electronica'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Electronica/Dance mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getR_bMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'r&b'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc R&B/Hip Hop/Rap mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'r&b'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc R&B/Hip Hop/Rap mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'r&b'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc R&B/Hip Hop/Rap mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getBluesMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'blues'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Blues/Jazz mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'blues'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Blues/Jazz mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'blues'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Blues/Jazz mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getCountryMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'country'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Country mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'country'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Country mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'country'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Country mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getLatinMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'latin'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Latin mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'latin'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Latin mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'latin'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Latin mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getKoreanMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'korean'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Hàn mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'korean'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Hàn mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'korean'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Hàn mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getChineseMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'chinese'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Hoa mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'chinese'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Hoa mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'chinese'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Hoa mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getJapaneseMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'japanese'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Nhật mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'japanese'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Nhật mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'japanese'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Nhật mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getThaiMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'thai'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Thái mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'thai'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Thái mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'thai'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Thái mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getChildrenMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'children'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Thiếu Nhi mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'children'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Thiếu Nhi mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'children'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Thiếu Nhi mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getInstrumentalMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'instrumental'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Không Lời mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'instrumental'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Không Lời mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getBeatMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
         const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'beat'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Beat mới',
                errorMessage: false,
                   musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getIndieMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const singers = await Singer.find({}).limit(6);
        Music.find({kind: 'indie'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Indie mới',
                errorMessage: false,
                musics: musics,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);
        try {
            // let music;
            const playlists = await Playlist.find({kind: 'indie'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Indie mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }
    } else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'indie'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Indie mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getFilmMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'playlist') {
        const singers = await Singer.find({}).limit(10);

        try {
            // let music;
            const playlists = await Playlist.find({kind: 'film'})
            .populate('musics')
            const names = [];
            const ids = [];
            for(let i = 0; i<playlists.length; i++) {
                let name = '';
                let id = '';
                for(let j = 0; j<playlists[i].musics.length; j++) {
                    const musicsDoc = await playlists[i].musics[j].populate('singers');
                    musicsDoc.singers.forEach(singer => {
                        if(name.indexOf(singer.fullname) == -1) {
                            name += singer.fullname + ',';
                            id += singer._id + ',';
                        }
                    })
                }
                names.push(name)
                ids.push(id)
            }
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Phim mới',
                errorMessage: false,
                singers,
                playlists: playlists,
                names: names,
                ids,
            })
        } catch(err) {
            console.log(err);
        }

    }  else if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'indie'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Nhạc Indie mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getYoungKaraokeMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'youngKaraoke'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Karaoke Nhạc Trẻ mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getRomanticKaraokeMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'romanticKaraoke'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Karaoke Nhạc Trữ Tình mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
} 

exports.getRemixKaraokeMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'vietnameseRemixKaraoke'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Karaoke Nhạc Remix Việt mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getVietnameseRapKaraokeMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'vietnameseRapKaraoke'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Karaoke Nhạc Rap Việt mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getRevolutionKaraokeMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'revolutionKaraoke'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Karaoke Nhạc Cách Mạng mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getChildrenKaraokeMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'childrenKaraoke'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Karaoke Nhạc Thiếu Nhi mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getUsaKaraokeMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'usaKaraoke'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Karaoke Nhạc Âu Mỹ mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getFunnyVideo = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'funny'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Clip Vui mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getComedyVideo = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'comedy'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Hài Kịch mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}
exports.getFilmVideo = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'video') {
        const singers = await Singer.find({}).limit(10);
        const videos = await Video.find({kind: 'film'}).populate('singers');

        let nameSingersArray = [];
        let idSingersArray = [];
        for(let i in videos) {
            let nameString = "";
            let idString = "";
            for(let j in videos[i].singers) {
                nameString += videos[i].singers[j].fullname.concat(',');
                idString += videos[i].singers[j]._id.toString().concat(',');
            }
            idSingersArray.push(idString);
            nameSingersArray.push(nameString);
        }
        res.render('video/generalVideo', {
            pageTitle: 'Video Phim Việt Nam mới',
            errorMessage: false,
            singers,
            videos,
            nameSingersArray,
            idSingersArray,
        });
        
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getVietnameseMusicRank = async (req, res, next) => {
    try {
        const singers = await Singer.find({}).limit(8);
        const playlists = await Playlist.find({}).limit(8);
        const musics = await Music.find({original: 'VietNam'}).populate('singers').sort({
            views: '-1'
        }).limit(20);
        res.render('music/musicRank', {
            pageTitle: 'Bảng xếp hạng nhạc Việt',
            errorMessage: false,
            singers,
            playlists,
            musics,
        });
    } catch(err) {
        console.log(err);
    }
  
}

exports.getUsaMusicRank = async (req, res, next) => {
    try {
        const singers = await Singer.find({}).limit(8);
        const playlists = await Playlist.find({}).limit(8);
        const musics = await Music.find({original: 'Usa'}).populate('singers').sort({
            views: '-1'
        }).limit(20);
        res.render('music/musicRank', {
            pageTitle: 'Bảng xếp hạng nhạc Âu Mỹ',
            errorMessage: false,
            singers,
            musics,
            playlists,
        });
    } catch(err) {
        console.log(err);
    }
  
}

exports.getKoreaMusicRank = async (req, res, next) => {
    try {
        const singers = await Singer.find({original: 'Korea'}).limit(8);
        const playlists = await Playlist.find({}).limit(8);
        res.render('music/musicRank', {
            pageTitle: 'Bảng xếp hạng nhạc Hàn',
            errorMessage: false,
            singers,
            playlists,
        });
    } catch(err) {
        console.log(err);
    }
  
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
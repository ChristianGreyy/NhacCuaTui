const Music = require('../models/MusicModel');
const User = require('../models/UserModel');
const Playlist = require('../models/PlaylistModel');
const mongoose = require('mongoose');

exports.getNewMusic = async (req, res, next) => {
    // console.log(req.originalUrl)
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({})
        .populate('singers')
        .then(musics => {
            // console.log(musics[0].singers)
            res.render('music/newMusic', {
                pageTitle: 'Bài hát mới',
                errorMessage: false,
                musics: musics,
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

exports.getMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    let musicId = req.params.musicId;
    if(url === 'bai-hat') {
        Music.findById(musicId)
        .populate('singers')
        .populate('poster')
        .then(music => {
            if(!music) {
                console.log('Music not found');
                res.redirect('/');
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
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getYoungMusic = async (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'young'})
        .populate('singers')
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
    } else if(url === 'playlist') {
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

exports.getRomanticMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'romantic'})
        .populate('singers')
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
    } else if(url === 'playlist') {
        Playlist.find({kind: 'yoromanticung'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Trữ Tình mới',
                errorMessage: false,
                musics,
            });
        })
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getRemixMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'vietnameseRemix'})
        .populate('singers')
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
    }else if(url === 'playlist') {
        Playlist.find({kind: 'vietnameseRemix'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Remix Việt mới',
                errorMessage: false,
                musics,
            });
        })
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getVietnameseRapMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'vietnameseRap'})
        .populate('singers')
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
    }else if(url === 'playlist') {
        Playlist.find({kind: 'vietnameseRap'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Rap Việt mới',
                errorMessage: false,
                musics,
            });
        })
    } else {
        res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
}

exports.getWarMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'war'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Tiền Chiến mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    }else if(url === 'playlist') {
        Playlist.find({kind: 'war'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Tiền Chiến mới',
                errorMessage: false,
                musics,
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

exports.getvietnameseRockMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'vietnameseRock'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Rock Việt mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'vietnameseRock'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Rock Việt mới',
                errorMessage: false,
                musics,
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

exports.getTrinhMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'getTrinhMusic'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Trịnh mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'getTrinhMusic'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Trịnh mới',
                errorMessage: false,
                musics,
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

exports.getRevolutionMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'revolution'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Cách Mạng mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'revolution'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Cách Mạng mới',
                errorMessage: false,
                musics,
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

exports.getPopMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'pop'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Pop mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'pop'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Pop mới',
                errorMessage: false,
                musics,
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
exports.getUsUkRockMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'usUkRock'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Rock mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'usUkRock'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Rock mới',
                errorMessage: false,
                musics,
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
exports.getElectronicaMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'electronica'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Electronica/Dance mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'electronica'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Electronica/Dance mới',
                errorMessage: false,
                musics,
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
exports.getR_bMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'r&b'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc R&B/Hip Hop/Rap mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'r&b'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc R&B/Hip Hop/Rap mới',
                errorMessage: false,
                musics,
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
exports.getBluesMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'blues'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Blues/Jazz mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'blues'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Blues/Jazz mới',
                errorMessage: false,
                musics,
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
exports.getCountryMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'country'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Country mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'country'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Country mới',
                errorMessage: false,
                musics,
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
exports.getLatinMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'latin'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Latin mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'latin'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Latin mới',
                errorMessage: false,
                musics,
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
exports.getKoreanMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'korean'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Hàn mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'korean'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Hàn mới',
                errorMessage: false,
                musics,
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
exports.getChineseMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'chinese'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Hoa mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'chinese'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Hoa mới',
                errorMessage: false,
                musics,
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
exports.getJapaneseMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'japanese'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Nhật mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'japanese'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Nhật mới',
                errorMessage: false,
                musics,
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
exports.getThaiMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'thai'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Thái mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'thai'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Thái mới',
                errorMessage: false,
                musics,
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
exports.getChildrenMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'children'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Thiếu Nhi mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'children'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Thiếu Nhi mới',
                errorMessage: false,
                musics,
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
exports.getInstrumentalMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'instrumental'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Không Lời mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'instrumental'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Không Lời mới',
                errorMessage: false,
                musics,
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
exports.getBeatMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'beat'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Beat mới',
                errorMessage: false,
                musics,
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

exports.getIndieMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'bai-hat') {
        Music.find({kind: 'indie'})
        .populate('singers')
        .then(musics => {
            res.render('music/generalMusic.ejs', {
                pageTitle: 'Nhạc Indie mới',
                errorMessage: false,
                musics,
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else if(url === 'playlist') {
        Playlist.find({kind: 'indie'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Indie mới',
                errorMessage: false,
                musics,
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

exports.getFilmMusic = (req, res, next) => {
    const url = req.originalUrl.split('/')[1];
    if(url === 'playlist') {
        Playlist.find({kind: 'film'})
        .populate('singers')
        .then(musics => {
            res.render('playlist/generalPlaylist.ejs', {
                pageTitle: 'Playlist Nhạc Phim mới',
                errorMessage: false,
                musics,
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
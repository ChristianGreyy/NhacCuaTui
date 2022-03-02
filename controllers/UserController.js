const User = require('../models/UserModel');
const Playlist = require('../models/PlaylistModel');
const Music = require('../models/MusicModel');

exports.postCreatePlaylist = async (req, res, next) => {
    try {
        const { idPlaylist, idUser } = req.params;
        
        const user = await User.findOne({_id: idUser});
        const isPlaylist = user.playlists.find(id => id.toString() === idPlaylist.toString());
        if(!isPlaylist) {
            user.playlists.push(idPlaylist);
            const result = await user.save();
            console.log(result);
            const playlist = await Playlist.findOne({_id: idPlaylist});
            playlist.users.push(idUser);
            const result2 = await playlist.save();

            return res.redirect(`/playlist/${idPlaylist}`);
        } else {
            return res.json({message: 'Bạn đã có playlist này trong phần yêu thích'})
        }

    } catch(err) {
        console.log(err);
    }

}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({}).sort({
        coins: -1,
    }).limit(10)
    res.render('user/users', {
        pageTitle: 'Top người dùng',
        errorMessage: false,
        users,
    })
}

exports.getPersonalUser = async (req, res, next) => {

    let idUser = req.params.id;
    const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
    const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
    const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
    if(idUser.length !=24) {
        return res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }
    User.findOne({_id: idUser})
    .populate('playlists')
    .then(user => {
        if(!user) {
            return res.render('error/404', {
                pageTitle: 'Không tìm thấy trang', 
                errorMessage: false,
            });
        }
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/personalUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Home',
            user: user,      
            identity: req.identity,
            musicsVietnam,
            musicsUsa,
            musicsKorea
        });    
    })
    .catch(err => {
        console.log('err');
    })
}

exports.getPersonalPlayListUser = async (req, res, next) => {
    let idUser = req.params.id;
    const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
    const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
    const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
    User.findOne({_id: idUser})
    .populate('playlists')
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/playlistUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Playlist',
            user: user,
            identity: req.identity,
            musicsVietnam,
            musicsUsa,
            musicsKorea
        });    
    })
    .catch(err => {
        console.log('err');
    })
   
}

exports.getPersonalVideoUser = async (req, res, next) => {
    let idUser = req.params.id;
    const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
    const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
    const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/videoUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Video',
            user: user ,
            identity: req.identity,
            musicsVietnam,
            musicsUsa,
            musicsKorea
        }); 
    })
    .catch(err => {
        console.log('err');
    })
 
}

exports.getPersonalUploadUser = async (req, res, next) => {
    let idUser = req.params.id;
    const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
    const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
    const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/uploadUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Tui Upload',
            user: user,
            identity: req.identity,
            musicsVietnam,
            musicsUsa,
            musicsKorea
        });    
    })
    .catch(err => {
        console.log(err);
    })
   
}

exports.getPersonalFriendUser = async (req, res, next) => {
    let idUser = req.params.id;
    const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
    const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
    const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/friendUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Bạn Bè',
            user: user ,
            identity: req.identity,
            musicsVietnam,
            musicsUsa,
            musicsKorea
    }); 
    })
    .catch(err => {
        console.log('err');
    })

}

exports.getAdminUser = async (req, res, next) => {
    const user = await req.user.populate('playlists')
    console.log(user)
    res.render('user/admin-user/adminUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Quản lý',
        user: user,
    }); 
}

exports.postAdminUser = (req, res, next) => {
    const {fullname, day, month, year, gender, address, phoneNumber, identityCard, introduce} = req.body;
    User.findOne({_id: req.user._id})
    .then(user => {
        user.fullname = fullname;
        user.day = day;
        user.month = month;
        user.year = year;
        user.gender = gender;
        user.address = address;
        user.phoneNumber = phoneNumber;
        user.identityCard = identityCard;
        user.introduce = introduce;
        return user.save();
    })
    .then(result => {
        console.log('updated');
        res.redirect(`/user/${req.user._id}/quan-ly`);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getAdminFriendUser = (req, res, next) => {
    res.render('user/admin-user/friendUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Bạn bè',
        user: req.user   
    }); 
}

exports.getAdminPlaylistUser = async (req, res, next) => {
    const user = await req.user.populate('playlists');
    res.render('user/admin-user/playlistUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Playlist',
        user: user,   
    }); 
}

exports.getAdminVideoUser = (req, res, next) => {
    res.render('user/admin-user/videoUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Video',
        user: req.user   
    }); 
}

exports.getAdminHistoryUser = (req, res, next) => {
    res.render('user/admin-user/historyUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Lịch sử',
        user: req.user   
    }); 
}

exports.getAdminApplicationUser = (req, res, next) => {
    res.render('user/admin-user/applicationUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Quản lý thiết bị',
        user: req.user   
    }); 
}

exports.getUpdatePasswordAdminUser = (req, res, next) => {
    res.render('user/admin-user/passwordUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Quản lý',
        user: req.user,
        success: false,
    });
}

exports.postUpdatePasswordAdminUser = (req, res, next) => {
    const {password, newPassword} = req.body;
    User.findOne({_id: req.user._id})
    .then(user => {
        if(user.password !== password) {
            res.redirect(`/user/${user._id}/doi-mat-khau`);
        }
        user.password = password;
        return user.save();
    })  
    .then(result => {
        console.log('Updated');
        res.render('user/admin-user/passwordUser', {
            errorMessage: false,
            pageTitle: req.user.username + ' | ' + 'Quản lý',
            user: req.user,
            success: true,
        })
    })
    .catch(err => {
        console.log('err');
    })

}

exports.postAddFriend = async (req, res, next) => {
    const { idUser } = req.params;

    const user = await User.findOne({_id: idUser});

    if(!user) {
        return res.render('error/404', {
            pageTitle: 'Không tìm thấy trang', 
            errorMessage: false,
        });
    }

    const userDoc = await User.findOne({_id: req.user._id})
    userDoc.friends.push(user._id);
    const result = userDoc.save();

    user.followers.push(req.user._id);
    const result2 = user.save();


    return res.redirect(`/user/${idUser}`);

}
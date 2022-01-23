const User = require('../models/UserModel');

exports.getPersonalUser = (req, res, next) => {

    let idUser = req.params.id;
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/personalUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Home',
            user: user,      
            identity: req.identity,
        });    
    })
    .catch(err => {
        console.log('err');
    })
}

exports.getPersonalPlayListUser = (req, res, next) => {
    let idUser = req.params.id;
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/playlistUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Playlist',
            user: user,
            identity: req.identity,
        });    
    })
    .catch(err => {
        console.log('err');
    })
   
}

exports.getPersonalVideoUser = (req, res, next) => {
    let idUser = req.params.id;
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/videoUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Video',
            user: user ,
            identity: req.identity,
        }); 
    })
    .catch(err => {
        console.log('err');
    })
 
}

exports.getPersonalUploadUser = (req, res, next) => {
    let idUser = req.params.id;
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/uploadUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Tui Upload',
            user: user,
            identity: req.identity,
        });    
    })
    .catch(err => {
        console.log(err);
    })
   
}

exports.getPersonalFriendUser = (req, res, next) => {
    let idUser = req.params.id;
    User.findOne({_id: idUser})
    .then(user => {
        let username = req.user ? req.user.username : ' ';
        res.render('user/personal-user/friendUser', {
            errorMessage: false,
            pageTitle: username + ' | ' + 'Bạn Bè',
            user: user ,
            identity: req.identity,
        }); 
    })
    .catch(err => {
        console.log('err');
    })

}

exports.getAdminUser = (req, res, next) => {
    res.render('user/admin-user/adminUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Quản lý',
        user: req.user   
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

exports.getAdminPlaylistUser = (req, res, next) => {
    res.render('user/admin-user/playlistUser', {
        errorMessage: false,
        pageTitle: req.user.username + ' | ' + 'Playlist',
        user: req.user   
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
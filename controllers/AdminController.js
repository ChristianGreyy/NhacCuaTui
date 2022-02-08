const Admin = require('../models/AdminModel');
const Music = require('../models/MusicModel');
const User = require('../models/UserModel');
const fs = require('fs');
const path = require('path');

exports.getAdminLogin = (req, res, next) => {
    res.render('admin/adminLogin.ejs')
}

exports.postAdminLogin = (req, res, next) => {
    const { username, password } = req.body;
    Admin.findOne({username: username})
    .then(admin => {
        if(!admin) {
            // const error = new Error('Not found username');
            // error.statusCode = 404;
            // throw error;
            return res.status(404).json('Not found username');
        }       
        if(password !== admin.password) {
            return res.status(401).json('Incorrect password');

        }
        res.redirect('/admin');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getCreateMusicAdmin = (req, res, next) => {
    res.render('admin/create-music', {
        pageTitle: 'Tạo bài hát'
    })
}

exports.postCreateMusicAdmin = async (req, res, next) => {
    const {name, author, singer, kind, subtitle} = req.body;

    console.log(req.files['background']);
    console.log(req.files['music']);
    const music = new Music ({
        name,
        author,
        singer,
        kind,
        subtitle,
        background: '/background/' + req.files['background'][0].filename,
        path: '/music/' + req.files['music'][0].filename,
        views: 0,
    })
    
    try {
        const result = await music.save();
        res.redirect('/admin/tao-bai-hat');
    } catch(err) {
        console.log(err);
    }
}

exports.getCreateSubtitleMusicAdmin = (req, res, next) => {
    res.render('admin/create-subtitle-music', {
        pageTitle: 'Tạo lời bài hát'
    })
}

exports.getListMusicAdmin = async (req, res, next) => {
    try {
        const musics = await Music.find({})
        res.render('admin/list-music', {
            pageTitle: 'Danh sách bài hát',
            musics: musics,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.getUserAdmin = async (req, res, next) => {
    try {
        const _id = req.params.idUser;
        const user = await User.findOne({_id: _id})
        res.render('admin/user', {
            pageTitle: 'Danh sách người dùng',
            user: user,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.deleteListMusicAdmin = (req, res, next) => {
    const {_idArray} = req.body;
    
    _idArray.forEach(id => {
        Music.findOne({_id: id})
        .then(music => {
            if(!music) {
                return res.statusCode(404).json('Not found music');
            }
            let musicPath = path.join(__dirname, '../public', music.path);
            let backgroundPath = path.join(__dirname, '../public', music.background);
            solveUnlinkPath(musicPath);
            solveUnlinkPath(backgroundPath);
            return Music.deleteOne({_id: id});
        })
        .then(result => {
            res.json({
                message: 'Deleted music',
            })
        })
        // Music.deleteOne({_id: id})
        // .then(result => {
        //     console.log(result);
        // })
        .catch(err => {
            console.log(err);
        })
    })
}

exports.getListUserAdmin = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.render('admin/list-user', {
            pageTitle: 'Danh sách người dùng',
            users: users,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.deleteListUserAdmin = (req, res, next) => {
    const {_idArray} = req.body;
    
    _idArray.forEach(id => {
        User.findOne({_id: id})
        .then(user => {
            if(!user) {
                return res.statusCode(404).json('Not found user');
            }
            return User.deleteOne({_id: id});
        })
        .then(result => {
            res.json({
                message: 'Deleted user',
            })
        })
        .catch(err => {
            console.log(err);
        })
    })
}

exports.getEditMusicAdmin = async (req, res, next) => {
    try {
        const _id = req.params.idMusic;
        const music = await Music.findOne({_id: _id})
        res.render('admin/edit-music', {
            pageTitle: 'Danh sách bài hát',
            music: music,
        })
    } catch(err) {
        console.log(err);
    }
}

exports.postEditMusicAdmin = async (req, res, next) => {
    const {name, author, singer, kind} = req.body;
    const _id = req.params.idMusic;
    try {
        const music = await Music.findOne({_id: _id})
        music.name = name;
        music.author = author;
        music.singer = singer;
        music.kind = kind;
        const result = await music.save();
        res.redirect('/admin/danh-sach-bai-hat');
    } catch(err) {
        console.log(err);
    }
}

const solveUnlinkPath = (path) => {
    fs.unlink(path, (err) => {
        if(err) {
            console.log(err);
        }
    })
} 
const Admin = require('../models/AdminModel');
const Music = require('../models/MusicModel');
const fs = require('fs');

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

const Admin = require('../models/AdminModel');

exports.getCreateMusicAdmin = (req, res, next) => {
   
    res.render('admin/home-create-music')
}

exports.postCreateMusicAdmin = (req, res, next) => {
    const {name, author, singer, music, kind, subtitle} = req.body;
    res.json({
        name, author, singer, music, kind, subtitle
    })
}

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
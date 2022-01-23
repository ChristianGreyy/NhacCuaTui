const User = require('../models/UserModel');

exports.check = (req, res, next) => {
    let idUser = req.params.id;
    if(!req.session.user) {
        req.identity = false;
        return next();
    }

    if(req.session.user.toString() === idUser.toString()) {
        req.identity = true;
        return next();
    } else {
        req.identity = false;
        return next();
    }
    
}

exports.forbidden = (req, res, next) => {
    if(!req.identity) {
        res.redirect('/');
    } else {
        return next();
    }
}
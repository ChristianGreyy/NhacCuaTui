const User = require('../models/UserModel');
module.exports = (req, res, next) => {
    if(!req.session.user) {
        return res.status(401).redirect('/');
    }
    return next();
}
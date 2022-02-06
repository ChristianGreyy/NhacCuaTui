const express = require('express');
const app = express();
const musicRouter = require('./MusicRouter');
const authRouter = require('./AuthRouter');
const userRouter = require('./UserRouter');
const adminRouter = require('./AdminRouter');
const User = require('../models/UserModel');

const routes = (app) => {
    app.use('/admin', adminRouter);
    app.use(authRouter);
    app.use('/user', userRouter);
    app.use('/bai-hat', musicRouter);
    app.use('/', (req, res, next) => {
        User.findOne({_id: req.session.user})
        .then(user => {
            res.render('home', {
                errorMessage: false,
                pageTitle: 'Trang chủ Nhaccuatui',
                user: user
            });
        })
        .catch(err => {
            console.log('err');
        })
    })
}

module.exports = routes;


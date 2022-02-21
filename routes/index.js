// const express = require('express');
// const app = express();
const musicRouter = require('./MusicRouter');
const authRouter = require('./AuthRouter');
const userRouter = require('./UserRouter');
const adminRouter = require('./AdminRouter');
const errorController = require('../controllers/ErrorController');
const User = require('../models/UserModel');

const routes = (app) => {
    app.use('/admin', adminRouter);
    app.use(authRouter);
    app.use('/user', userRouter);
    app.use('/bai-hat', musicRouter);
    app.use('/trang-chu', async (req, res, next) => {
        // try {
        //     throw new Error('test');
        //     const user = await User.findOne({_id: req.session.user})
        //     res.render('home', {
        //         errorMessage: false,
        //         pageTitle: 'Trang chủ Nhaccuatui',
        //         user: user
        //     });
        // } catch(err) {
        //     return next(err);
        //     console.log('err');
        // }
        User.findOne({_id: req.session.user})
        .then(user => {
            res.render('home', {
                errorMessage: false,
                pageTitle: 'Trang chủ Nhaccuatui',
                user: user
            });
        })
        .catch(err => {
            next(err);
            // console.log(err.statusCode);
        })
    })
    app.use(errorController.get404);
    app.use(errorController.get500);
    
}

module.exports = routes;


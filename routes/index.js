// const express = require('express');
// const app = express();
const musicRouter = require('./MusicRouter');
const authRouter = require('./AuthRouter');
const userRouter = require('./UserRouter');
const playlistRouter = require('./PlaylistRouter');
const adminRouter = require('./AdminRouter');
const singerRouter = require('./SingerRouter');
const newRouter = require('./NewRouter');
const errorController = require('../controllers/ErrorController');
const User = require('../models/UserModel');
const Music = require('../models/MusicModel');
const Singer = require('../models/SingerModel');
const Video  = require('../models/VideoModel');
const Playlist = require('../models/PlaylistModel');

const routes = (app) => {
    app.use('/admin', adminRouter);
    app.use(authRouter);
    app.use('/tin-tuc-am-nhac', newRouter);
    app.use('/nghe-si', singerRouter);
    app.use('/user', userRouter);
    app.use('/:baihat', musicRouter);
    app.use('/playlist', playlistRouter);
    app.use('/trang-chu', async (req, res, next) => {
        const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
        const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
        const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
        const playlists = await Playlist.find({}).limit(6);
        const singers = await Singer.find({}).limit(6);
        const videosVietNam = await Video.find({original: 'Vietnam'}).populate('singers').limit(6);
        const videosUsa = await Video.find({original: 'Usa'}).populate('singers').limit(6);
        const videosKorea = await Video.find({original: 'Korea'}).populate('singers').limit(6);
        User.findOne({_id: req.session.user})
        .then(user => {
            res.render('home', {
                errorMessage: false,
                pageTitle: 'Trang chủ Nhaccuatui',
                user: user,
                musicsVietnam,
                musicsUsa,
                musicsKorea,
                singers,
                playlists,
                videosVietNam,
                videosUsa,
                videosKorea
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


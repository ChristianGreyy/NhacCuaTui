const express = require('express');
const Music = require('../models/MusicModel');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const musicsVietnam = await Music.find({original: 'VietNam'}).populate('singers').limit(10);
    const musicsUsa = await Music.find({original: 'Usa'}).populate('singers').limit(10);
    const musicsKorea = await Music.find({original: 'Korea'}).populate('singers').limit(10);
    res.render('new.ejs', {
        pageTitle: 'Tin tức âm nhạc',
        errorMessage: false,
        musicsVietnam,
        musicsUsa,
        musicsKorea
    })
})

module.exports = router;
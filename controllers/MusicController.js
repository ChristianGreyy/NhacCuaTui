exports.getNewMusic = (req, res, next) => {
    res.render('music/newMusic', {
        pageTitle: 'Bài hát mới',
        errorMessage: false,
    });
}

exports.getMusic = (req, res, next) => {
    res.render('music/music', {
        pageTitle: 'Bước qua mùa cô đơn - vũ',
        errorMessage: false,
    });
}
const Singer = require('../models/SingerModel');

exports.getSinger = async (req, res, next) => {
    const idSinger = req.params.idSinger;
    try {
        const singer = await Singer.findOne({_id: idSinger});
        res.render('singer/personalSinger', {
            pageTitle: 'ca sĩ' + singer.fullname,
            singer,
            errorMessage: false,
        })
    } catch(err) {
        console.log(err);
    }
}
const Admin = require('../models/AdminModel');
module.exports = async (req, res, next) => {
    if(!req.session.admin) {
        return res.status(401).redirect('/');
    } 
    const idSession = req.session.admin.toString()

    try {
        const admin = await Admin.findOne({_id: idSession})
        if(!admin) {
            const error = new Error('Not found admin');
            error.statusCode = 404;
            throw error;
        }
        return next();

    } catch(err) {
        if(err) {
            const error = new Error('Error server');
            error.statusCode = 500;
            throw error;
        }
    }

}
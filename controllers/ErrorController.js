exports.get500 = (req, res, next) => {
    
}

exports.get404 = (req, res, next) => {
    res.render('error/404', {
        pageTitle: 'Không tìm thấy trang', 
        errorMessage: false,
    });
}
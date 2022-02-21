exports.get500 = (error, req, res, next) => {
    res.render('error/500', {
        pageTitle: 'Lỗi Server', 
        errorMessage: false,
    });
}

exports.get404 = (req, res, next) => {
    res.render('error/404', {
        pageTitle: 'Không tìm thấy trang', 
        errorMessage: false,
    });
}
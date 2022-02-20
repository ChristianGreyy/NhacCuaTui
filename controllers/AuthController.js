const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.postSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json('Error 422')
    }
    const { username } = req.body;
    const { password } = req.body;
    const { repassword } = req.body;
    const { email } = req.body;

    bcrypt.hash(password, 7, (err, passwordHash) => {
        if(err) {
            console.log('Error when hashing');
        }
        const user = new User({
            username,
            password: passwordHash,
            email,
            avatar: '/img/avatar.png',
            coin: 0,
            fullname: username,
            description: 'ordinary', 
            background: '',
            nationality: 'Việt Nam',
        });
        
        user.save()
        .then(user => {
            console.log('Saved!!');
            res.redirect('/');
        })
        .catch(err => {
            console.log('Error server');
        })

    })


}

exports.postLogin = (req, res, next) => {
    const { username } = req.body;
    const { password } = req.body;


    User.findOne({username: username})
    .then(user => {
        if(!user) {
            return res.render('home', {
                errorMessage: true,
                pageTitle: 'Trang chủ Nhaccuatui',
                user: user
            });
        }
        console.log(user)
        bcrypt.compare(password, user.password)
        .then(isPassword => {
            console.log(isPassword) 
            if(!isPassword) {   
                return res.render('home', {
                    errorMessage: true,
                    pageTitle: 'Trang chủ Nhaccuatui',
                    user: user
                });
            }
            console.log('login successful')
            req.session.user = user._id;
            res.redirect('/');
        })
        .catch(err => {
            console.log(err)
            console.log('error server when hashing');
        })
    })
    .catch(err => {
        console.log('error server when login');
        console.log(err);
    })

   

}

exports.postUpdate = (req, res, next) => {
    
}

exports.postLogout = (req, res, next) => {  
    delete req.session.user;
    return res.redirect('/trang-chu');
    // req.session.destroy(err => {
    //     if(err) {
    //         console.log('Error when logging out');
    //     }
    //     return res.redirect('/');
    // })
}
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

exports.postSignUp = (req, res, next) => {
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
            console.log('Username not found');
            return res.redirect('/');
        }
        bcrypt.compare(password, user.password)
        .then(isPassword => {
            if(!isPassword) {
                console.log('Incorrect password');
                res.redirect('/');
            }
            console.log('login successful')
            req.session.user = user._id;
            res.redirect('/');
        })
        .catch(err => {
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
    req.session.destroy(err => {
        if(err => {
            console.log('Error when logging out');
        })
        return res.redirect('/');
    })
}
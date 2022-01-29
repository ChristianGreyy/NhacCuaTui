const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/UserModel');

const authController = require('../controllers/AuthController');

router.post('/dang-ky', [
    body('username')
    .isLength({min: 5})
    .withMessage('must be at least 5 chars long')
    .custom((value, { req }) => {
        return User.findOne({username: req.body.username})
        .then(user => {
            if(user) {
                return Promise.reject('username already in use');
            }
        })
    }),
    body('password')
    .trim()
    .custom((value, { req }) => {
        const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(!regexPassword.test(value)) {
            return Promise.reject('The password must contain number, string, special characters');
        }
        return true;
    }), 
    body('repassword')
    .trim()
    .custom((value, { req }) => {
        if(value !== req.body.password) {
            return Promise.reject('The repassword must be similar to the password.');
        }
        return true;
    }),
], authController.postSignUp);
router.post('/dang-nhap', authController.postLogin);
router.post('/dang-xuat', authController.postLogout);

module.exports = router;

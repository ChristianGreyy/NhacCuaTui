const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.post('/dang-ky', authController.postSignUp);
router.post('/dang-nhap', authController.postLogin);
router.post('/dang-xuat', authController.postLogout);

module.exports = router;

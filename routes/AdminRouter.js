const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.get('/tao-bai-hat', adminController.getCreateMusicAdmin);
router.post('/tao-bai-hat', adminController.postCreateMusicAdmin);
router.get('/tao-loi-bai-hat', adminController.getCreateMusicAdmin);
router.get('/danh-sach-bai-hat', adminController.getCreateMusicAdmin);
router.get('/danh-sach-nguoi-dung', adminController.getCreateMusicAdmin);
router.get('/su-kien', adminController.getCreateMusicAdmin);
router.get('/login', adminController.getAdminLogin);
router.post('/login', adminController.postAdminLogin);


module.exports = router;
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.get('/tao-bai-hat', adminController.getCreateMusicAdmin);
router.post('/tao-bai-hat', adminController.postCreateMusicAdmin);
router.get('/tao-loi-bai-hat', adminController.getCreateSubtitleMusicAdmin);
router.get('/danh-sach-bai-hat', adminController.getListMusicAdmin);
router.get('/danh-sach-bai-hat/:idMusic', adminController.getEditMusicAdmin);
router.post('/danh-sach-bai-hat/:idMusic', adminController.postEditMusicAdmin);
router.delete('/danh-sach-bai-hat', adminController.deleteListMusicAdmin);
router.get('/danh-sach-nguoi-dung', adminController.getListUserAdmin);
router.get('/danh-sach-nguoi-dung/:idUser', adminController.getUserAdmin);
router.delete('/danh-sach-nguoi-dung', adminController.deleteListUserAdmin);
router.get('/su-kien', adminController.getCreateMusicAdmin);
router.get('/login', adminController.getAdminLogin);
router.post('/login', adminController.postAdminLogin);


module.exports = router;
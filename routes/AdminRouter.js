const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const multer = require('multer');
const multerStorage = require('../util/multer');
const authAdmin = require('../middlewares/authAdmin');

const storageMusic = multerStorage.storageMusic;
  
const storageSinger =  multerStorage.storageSinger;
  
//   app.use();
//   app.use();

router.get('/tao-bai-hat', authAdmin, adminController.getCreateMusicAdmin);
router.post('/tao-bai-hat', authAdmin, multer({storage: storageMusic}).fields([{name: 'background'}, {name: 'music'}]),  adminController.postCreateMusicAdmin);
router.get('/tao-loi-bai-hat', authAdmin, adminController.getCreateSubtitleMusicsAdmin);
router.get('/tao-loi-bai-hat/:idMusic', authAdmin, adminController.getCreateSubtitleMusicAdmin);
router.post('/tao-loi-bai-hat/:idMusic', authAdmin, adminController.postCreateSubtitleMusicAdmin);
router.delete('/tao-loi-bai-hat/:idMusic', authAdmin, adminController.deleteCreateSubtitleMusicAdmin);
router.get('/danh-sach-bai-hat', authAdmin, adminController.getListMusicAdmin);
router.get('/danh-sach-bai-hat/:idMusic', authAdmin, adminController.getEditMusicAdmin);
router.post('/danh-sach-bai-hat/:idMusic', authAdmin, adminController.postEditMusicAdmin);
router.delete('/danh-sach-bai-hat', authAdmin, adminController.deleteListMusicAdmin);
router.get('/tao-ca-si', authAdmin, adminController.getCreateSingerAdmin);
router.post('/tao-ca-si', authAdmin, multer({storage: storageSinger}).single('avatar'), adminController.postCreateSingerAdmin);
router.get('/danh-sach-ca-si', authAdmin, adminController.getListSingerAdmin);

router.get('/danh-sach-nguoi-dung', authAdmin, adminController.getListUserAdmin);
router.get('/danh-sach-nguoi-dung/:idUser', authAdmin, adminController.getUserAdmin);
router.delete('/danh-sach-nguoi-dung', adminController.deleteListUserAdmin);
router.get('/su-kien', authAdmin, adminController.getCreateMusicAdmin);
router.get('/login', adminController.getAdminLogin);
router.post('/login', adminController.postAdminLogin);


module.exports = router;
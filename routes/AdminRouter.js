const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const multer = require('multer');
const multerStorage = require('../util/multer');
const authAdmin = require('../middlewares/authAdmin');

const storageMusic = multerStorage.storageMusic;
  
const storageSinger =  multerStorage.storageSinger;

const storagePlaylist = multerStorage.storagePlaylist;

const storageVideo = multerStorage.storageVideo;

const storageEvent = multerStorage.storageEvent;
  
//   app.use();
//   app.use();

router.get('/fetch-singers', adminController.fetchSingersAdmin);
router.get('/fetch-musics', adminController.fetchMusicsAdmin);
router.get('/fetch-musics-rank-vietnam', adminController.fetchVietnamMusicAdmin);
router.get('/fetch-musics-rank-usa', adminController.fetchUsaMusicAdmin);
router.get('/fetch-musics-rank-korea', adminController.fetchKoreaMusicAdmin);
router.get('/fetch-playlists', adminController.fetchPlaylistAdmin);
router.get('/fetch-events', adminController.fetchEventAdmin);


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

router.get('/tao-video', authAdmin, adminController.getcreateVideocAdmin);
router.post('/tao-video', multer({storage: storageVideo}).single('background'), adminController.postcreateVideocAdmin);
router.get('/danh-sach-video', authAdmin, adminController.getListVideocAdmin);


router.get('/tao-playlist', authAdmin, adminController.getCreatePlaylistMusicAdmin);
router.post('/tao-playlist', authAdmin, multer({storage: storagePlaylist}).single('background'), adminController.postCreatePlaylistMusicAdmin);
router.get('/danh-sach-playlist', authAdmin, adminController.getListPlaylistMusicAdmin);
router.delete('/danh-sach-playlist', authAdmin, adminController.deleteListPlaylistMusicAdmin);

router.get('/tao-ca-si', authAdmin, adminController.getCreateSingerAdmin);
router.post('/tao-ca-si',  multer({storage: storageSinger}).fields([{name: 'avatar'}, {name: 'background'}]), adminController.postCreateSingerAdmin);
router.get('/danh-sach-ca-si', authAdmin, adminController.getListSingerAdmin);

router.get('/danh-sach-nguoi-dung', authAdmin, adminController.getListUserAdmin);
router.get('/danh-sach-nguoi-dung/:idUser', authAdmin, adminController.getUserAdmin);
router.delete('/danh-sach-nguoi-dung', adminController.deleteListUserAdmin);

router.get('/tao-su-kien', authAdmin, adminController.getCreateEventAdmin);
router.post('/tao-su-kien', authAdmin,  multer({storage: storageEvent}).single('background'), adminController.postCreateEventAdmin);
router.get('/danh-sach-su-kien', authAdmin, adminController.getListEventMusicAdmin);
router.delete('/danh-sach-su-kien', authAdmin, adminController.deleteListEventMusicAdmin);

router.get('/login', adminController.getAdminLogin);
router.post('/login', adminController.postAdminLogin);


module.exports = router;
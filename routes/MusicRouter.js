const express = require('express');
var router = express.Router();
const musicController = require('../controllers/MusicController');

router.get('/nhac-tre-moi', musicController.getYoungMusic);
router.get('/nhac-tru-tinh-moi', musicController.getRomanticMusic);
router.get('/nhac-remix-viet-moi', musicController.getRemixMusic);
router.get('/nhac-rap-viet-moi', musicController.getVietnameseRapMusic);
router.get('/nhac-tien-chien-moi', musicController.getYoungMusic);
router.get('/nhac-trinh-moi', musicController.getYoungMusic);
router.get('/nhac-rock-viet-moi', musicController.getYoungMusic);
router.get('/nhac-cach-mang-moi', musicController.getYoungMusic);
router.get('/nhac-pop-moi', musicController.getYoungMusic);
router.get('/nhac-rock-moi', musicController.getYoungMusic);
router.get('/nhac-Electronica-Dance-moi', musicController.getYoungMusic);
router.get('/nhac-hip-hop-moi', musicController.getYoungMusic);
router.get('/nhac-Blues-Jazz-moi', musicController.getYoungMusic);
router.get('/nhac-Country-moi', musicController.getYoungMusic);
router.get('/nhac-Latin-moi', musicController.getYoungMusic);
router.get('/nhac-Han-moi', musicController.getYoungMusic);
router.get('/nhac-Hoa-moi', musicController.getYoungMusic);
router.get('/nhac-Nhat-moi', musicController.getYoungMusic);
router.get('/nhac-Thai-moi', musicController.getYoungMusic);
router.get('/nhac-thieu-nhi-moi', musicController.getYoungMusic);
router.get('/nhac-khong-loi-moi', musicController.getYoungMusic);
router.get('/nhac-beat-moi', musicController.getYoungMusic);
router.get('/bai-hat-moi', musicController.getNewMusic);
router.get('/:musicId', musicController.getMusic);


module.exports = router;
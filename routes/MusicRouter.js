const express = require('express');
var router = express.Router();
const musicController = require('../controllers/MusicController');

router.get('/nhac-tre-moi', musicController.getYoungMusic);
router.get('/nhac-tru-tinh-moi', musicController.getRomanticMusic);
router.get('/nhac-remix-viet-moi', musicController.getRemixMusic);
router.get('/nhac-rap-viet-moi', musicController.getVietnameseRapMusic);
router.get('/nhac-tien-chien-moi', musicController.getWarMusic);
router.get('/nhac-trinh-moi', musicController.getTrinhMusic);
router.get('/nhac-rock-viet-moi', musicController.getvietnameseRockMusic);
router.get('/nhac-cach-mang-moi', musicController.getRevolutionMusic);
router.get('/nhac-pop-moi', musicController.getPopMusic);
router.get('/nhac-rock-moi', musicController.getUsUkRockMusic);
router.get('/nhac-Electronica-Dance-moi', musicController.getElectronicaMusic);
router.get('/nhac-hip-hop-moi', musicController.getR_bMusic);
router.get('/nhac-Blues-Jazz-moi', musicController.getBluesMusic);
router.get('/nhac-Country-moi', musicController.getCountryMusic);
router.get('/nhac-Latin-moi', musicController.getLatinMusic);
router.get('/nhac-Han-moi', musicController.getKoreanMusic);
router.get('/nhac-Hoa-moi', musicController.getChineseMusic);
router.get('/nhac-Nhat-moi', musicController.getJapaneseMusic);
router.get('/nhac-Thai-moi', musicController.getThaiMusic);
router.get('/nhac-thieu-nhi-moi', musicController.getChildrenMusic);
router.get('/nhac-khong-loi-moi', musicController.getInstrumentalMusic);
router.get('/nhac-beat-moi', musicController.getBeatMusic);
router.get('/nhac-Indie-moi', musicController.getIndieMusic);
router.get('/nhac-phim-moi', musicController.getFilmMusic);
router.get('/bai-hat-moi', musicController.getNewMusic);
router.get('/playlist-moi', musicController.getNewPlaylist);
router.get('/video-moi', musicController.getNewVideolist);

router.get('/karaoke-nhac-tre-moi', musicController.getYoungKaraokeMusic);
router.get('/karaoke-nhac-tru-tinh-moi', musicController.getRomanticKaraokeMusic);
router.get('/karaoke-nhac-remix-moi', musicController.getRemixKaraokeMusic);
router.get('/karaoke-nhac-rap-viet-moi', musicController.getVietnameseRapKaraokeMusic);
router.get('/karaoke-nhac-cach-mang-moi', musicController.getRevolutionKaraokeMusic);
router.get('/karaoke-nhac-thieu-nhi-moi', musicController.getChildrenKaraokeMusic);
router.get('/karaoke-nhac-au-my-moi', musicController.getUsaKaraokeMusic);

router.get('/clip-vui-moi', musicController.getFunnyVideo);
router.get('/hai-kich-moi', musicController.getComedyVideo);
router.get('/phim-viet-nam-moi', musicController.getFilmVideo);

router.get('/bang-xep-hang-viet', musicController.getVietnameseMusicRank);
router.get('/bang-xep-hang-usa', musicController.getUsaMusicRank);
router.get('/bang-xep-hang-korea', musicController.getKoreaMusicRank);
router.post('/tao-loi-bai-hat/:musicId', musicController.createSubtitleMusic);
router.get('/:musicId', musicController.getMusic);

module.exports = router;
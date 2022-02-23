const express = require('express');
const singerController = require('../controllers/SingerController');
const router = express.Router();

router.get('/:idSinger/bai-hat', singerController.getMusicSinger);
router.get('/:idSinger/playlist', singerController.getPlaylistSinger);
router.get('/:idSinger/video', singerController.getVideoSinger);
router.get('/:idSinger/karaoke', singerController.getKaraokeSinger);
router.get('/:idSinger/beat', singerController.getBeatSinger);
router.get('/:idSinger', singerController.getSinger);

module.exports = router;
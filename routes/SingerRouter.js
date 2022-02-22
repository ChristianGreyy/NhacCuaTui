const express = require('express');
const singerController = require('../controllers/SingerController');
const router = express.Router();

router.get('/:idSinger', singerController.getSinger);

module.exports = router;
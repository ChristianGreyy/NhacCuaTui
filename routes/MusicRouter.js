const express = require('express');
var router = express.Router();
const musicController = require('../controllers/MusicController');

router.get('/bai-hat-moi', musicController.getNewMusic);
router.get('/:id', musicController.getMusic);


module.exports = router;
const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const identiyMiddleware = require('../middlewares/identity');
const authMiddleware = require('../middlewares/auth');

router.get('/', userController.getUsers);

router.get('/:id/ban-be', identiyMiddleware.check, userController.getPersonalFriendUser);
router.get('/:id/bai-hat-tui-upload', identiyMiddleware.check, userController.getPersonalUploadUser);
router.get('/:id/video', identiyMiddleware.check, userController.getPersonalVideoUser);
router.get('/:id/playlist', identiyMiddleware.check, userController.getPersonalPlayListUser);
router.get('/:id', identiyMiddleware.check, userController.getPersonalUser);
////////////////////////////////////////////////////////////////////////////////
router.get('/:id/quan-ly', authMiddleware, identiyMiddleware.check, identiyMiddleware.forbidden, userController.getAdminUser);
router.get('/:id/quan-ly-ban-be', authMiddleware, identiyMiddleware.check, identiyMiddleware.forbidden, userController.getAdminFriendUser);
router.get('/:id/quan-ly-playlist', authMiddleware, identiyMiddleware.check, identiyMiddleware.forbidden, userController.getAdminPlaylistUser);
router.get('/:id/quan-ly-video', authMiddleware, identiyMiddleware.check, identiyMiddleware.forbidden, userController.getAdminVideoUser);
router.get('/:id/quan-ly-lich-su', authMiddleware, identiyMiddleware.check, identiyMiddleware.forbidden, userController.getAdminHistoryUser);
router.get('/:id/quan-ly-thiet-bi', authMiddleware, identiyMiddleware.check, identiyMiddleware.forbidden, userController.getAdminApplicationUser);

router.post('/:id/quan-ly', authMiddleware, userController.postAdminUser);
router.get('/:id/doi-mat-khau', authMiddleware, userController.getUpdatePasswordAdminUser);
router.post('/:id/doi-mat-khau', authMiddleware, userController.postUpdatePasswordAdminUser);

router.post('/ket-ban/:idUser', authMiddleware, userController.postAddFriend);

router.post('/playlist/:idPlaylist/:idUser', authMiddleware, userController.postCreatePlaylist);


module.exports = router;
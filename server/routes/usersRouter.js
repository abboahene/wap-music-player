const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.post('/login',userController.login);
router.get('/playlists',userController.getPlayList);
router.post('/playlists/:songId',userController.addSongToPlayList);
router.put('/playlists/:songId',userController.deleteSongFromPlayList);

module.exports = router;
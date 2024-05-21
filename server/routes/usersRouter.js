const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.post('/login',userController.login);
router.get('/:username/playlists',userController.getPlayList);
router.post('/:username/playlists/:songId',userController.addSongToPlayList);

module.exports = router;
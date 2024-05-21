const express = require('express');
const songController = require('../controllers/songsController');
const router = express.Router();

router.get('/',songController.getAll);

module.exports = router;
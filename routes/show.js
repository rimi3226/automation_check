const express = require('express');

const { renderShow } = require('../controllers/show.js');

const router = express.Router();

router.get('/', renderShow);

module.exports = router;

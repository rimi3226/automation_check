const express = require('express');

const { check_authnum, check_person } = require('../middlewares');
const { pnum } = require('../controllers/pnum.js');
const { anum } = require('../controllers/anum.js');

const router = express.Router();

// POST
router.post('/pnum', check_person, pnum);
router.post('/anum', check_authnum, anum);


module.exports = router;

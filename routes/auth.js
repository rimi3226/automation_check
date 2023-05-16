const express = require('express');

const { check_authnum, check_person } = require('../middlewares');
const { pnum } = require('../controllers/pnum.js');
const { anum } = require('../controllers/anum.js');

const router = express.Router();

// POST /auth/pnum
router.post('/pnum', check_person, pnum);

// POST /auth/anum
router.post('/anum', check_authnum, anum);


module.exports = router;

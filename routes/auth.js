const express = require('express');

const {check} = require('../middlewares');
const {pnum} = require('../controllers/pnum.js');
const {anum} = require('../controllers/anum.js');

const router = express.Router();

// GET /auth/pnum
router.get('/pnum',check ,pnum); 
router.get('/anum', anum); 


module.exports = router;

const express = require('express');

const {check} = require('../middlewares');
const {pnum} = require('../controllers/pnum.js');
const {anum} = require('../controllers/anum.js');

const router = express.Router();

// POST
router.post('/pnum',check ,pnum); 
router.post('/anum', anum); 


module.exports = router;

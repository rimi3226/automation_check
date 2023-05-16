const express = require('express');
const { renderMain } = require('../controllers/page.js');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    next();
})

// GET /
router.get('/', renderMain);

module.exports = router;

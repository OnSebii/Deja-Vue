const express = require('express');
const { getCars } = require('../controllers/kfz');

const router = express.Router();

// KFZ Routen

router.get('/kfz', getCars);

module.exports = router;

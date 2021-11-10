const express = require('express');
const { getKennzeichen } = require('../controllers/kennzeichen');

const router = express.Router();

// Kennzeichen Routen

router.get('/kennzeichen', getKennzeichen);

module.exports = router;

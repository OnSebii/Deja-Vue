const express = require('express');
const { getKennzeichen, addKennzeichen } = require('../controllers/kennzeichen');

const router = express.Router();

// Kennzeichen Routen

router.get('/', getKennzeichen);
router.post('/', addKennzeichen);

module.exports = router;

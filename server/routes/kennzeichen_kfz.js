const express = require('express');
const { getKennzeichenKfz, addKennzeichenKfz } = require('../controllers/kennzeichen_kfz');

const router = express.Router();

router.get('/', getKennzeichenKfz);
router.post('/', addKennzeichenKfz);

module.exports = router;

const express = require('express');
const { addKennzeichenKfz } = require('../controllers/kennzeichen_kfz');

const router = express.Router();

router.post('/', addKennzeichenKfz);

module.exports = router;

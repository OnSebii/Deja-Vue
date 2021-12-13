const express = require('express');
const { getKennzeichenKfz, addKennzeichenKfz, deleteKennzeichenKfz } = require('../controllers/kennzeichen_kfz');

const router = express.Router();

router.get('/', getKennzeichenKfz);
router.post('/', addKennzeichenKfz);
router.delete('/', deleteKennzeichenKfz);

module.exports = router;

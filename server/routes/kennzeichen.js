const express = require('express');
const { getKennzeichen, addKennzeichen, deleteKennzeichen } = require('../controllers/kennzeichen');

const router = express.Router();

// Kennzeichen Routen

router.get('/', getKennzeichen);
router.post('/', addKennzeichen);
router.delete('/:id', deleteKennzeichen);

module.exports = router;

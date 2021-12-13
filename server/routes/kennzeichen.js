const express = require('express');
const { getKennzeichen, addKennzeichen, deleteKennzeichen, updateKennzeichen } = require('../controllers/kennzeichen');

const router = express.Router();

// Kennzeichen Routen

router.get('/', getKennzeichen);
router.post('/', addKennzeichen);
router.patch('/:id', updateKennzeichen);
router.delete('/:id', deleteKennzeichen);

module.exports = router;

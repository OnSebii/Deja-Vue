const express = require('express');
const { getCars, addCar, deleteCar } = require('../controllers/kfz');

const router = express.Router();

// KFZ Routen

router.get('/', getCars);
router.post('/', addCar);
router.delete('/:id', deleteCar);

module.exports = router;

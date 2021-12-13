const express = require('express');
const { getCars, addCar, deleteCar, updateCar } = require('../controllers/kfz');

const router = express.Router();

// KFZ Routen

router.get('/', getCars);
router.post('/', addCar);
router.patch('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;

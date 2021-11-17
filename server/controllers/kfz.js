const asyncHandler = require('express-async-handler');
const model = require('../model/kfz.js');

// TODO:Filter einbauen für Marke/Gesehen
const getCars = asyncHandler(async (req, res) => {
  const cars = await model.getCars(req.query.id);
  if (cars[0] === undefined) return res.status(404).json({ code: 404, data: `Auto mit der ID ${req.query.id} wurde nicht gefunden` });
  return res.status(200).json({ code: 200, data: cars });
});

const addCar = asyncHandler(async (req, res) => {
  if (req.body.marke === undefined || req.body.modell === undefined) {
    return res.status(400).json({ code: 400, data: 'Marke oder Modell werden benötigt' });
  }

  const [{ id }] = await model.addCar(req.body);

  if (id > 0) {
    return res.status(200).json({
      code: 200,
      data: 'Kennzeichen wurde erfolgreich hinzugefügt',
      carId: id,
    });
  }
  return res.status(500).json({ code: 500, data: 'Server Error' });
});

const deleteCar = asyncHandler(async (req, res) => {
  const carCheck = await model.getCars(req.params.id);
  if (carCheck[0] === undefined) return res.status(404).json({ code: 404, data: `Auto mit der ID ${req.params.id} wurde nicht gefunden` });

  if (req.params.id === undefined) {
    return res.status(400).json({ code: 400, data: 'ID wird benötigt für das löschen eines Autos' });
  }

  const [{ car }] = await model.deleteCar(req.params.id);

  return res.status(200).json({ code: 200, data: `|${car}| wurde gelöscht` });
});

module.exports = {
  getCars,
  addCar,
  deleteCar,
};

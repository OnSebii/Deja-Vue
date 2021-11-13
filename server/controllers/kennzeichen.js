const asyncHandler = require('express-async-handler');
const model = require('../model/kennzeichen');

const getKennzeichen = asyncHandler(async (req, res) => {
  const kennzeichen = await model.getKennzeichen(req.query.id);
  if (kennzeichen[0] === undefined) return res.status(404).json({ code: 404, data: `Kennzeichen mit der ID ${req.query.id} wurde nicht gefunden` });
  return res.status(200).json({ code: 200, data: kennzeichen });
});

const addKennzeichen = asyncHandler(async (req, res) => {
  if (req.body.bezirk === undefined || req.body.nummer === undefined) {
    return res.status(400).json({ code: 400, data: 'Bezirk oder Kennzeichennummer werden benötigt' });
  }

  const [{ id }] = await model.addKennzeichen(req.body);

  if (id > 0) {
    return res.status(200).json({
      code: 200,
      data: 'Kennzeichen wurde erfolgreich hinzugefügt',
      kennzeichenId: id,
    });
  }
});

const deleteKennzeichen = asyncHandler(async (req, res) => {
  const kennzeichenCheck = await model.getKennzeichen(req.params.id);
  if (kennzeichenCheck[0] === undefined) return res.status(404).json({ code: 404, data: `Kennzeichen mit der ID ${req.params.id} wurde nicht gefunden` });

  if (req.params.id === undefined) {
    return res.status(400).json({ code: 400, data: 'ID wird benötigt für das löschen eines Kennzeichens' });
  }

  const [{ kennzeichen }] = await model.deleteKennzeichen(req.params.id);

  return res.status(200).json({ code: 200, data: `Kennzeichen |${kennzeichen}| wurde gelöscht` });
});

module.exports = {
  getKennzeichen,
  addKennzeichen,
  deleteKennzeichen,
};

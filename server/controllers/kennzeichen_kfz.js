const asyncHandler = require('express-async-handler');
const model = require('../model/kennzeichen_kfz');

const getKennzeichenKfz = asyncHandler(async (req, res) => {
  const kennzeichenKfz = await model.getKennzeichenKfz(req.query.id);
  if (kennzeichenKfz[0] === undefined) return res.status(404).json({ code: 404, data: `Kennzeichen und Auto mit der ID ${req.query.id} wurde nicht gefunden` });
  return res.status(200).json({ code: 200, data: kennzeichenKfz });
});

const addKennzeichenKfz = asyncHandler(async (req, res) => {
  if (req.body.knzid === undefined || req.body.kfzid === undefined) {
    return res.status(400).json({ code: 400, data: 'KennzeichenID und KfzID werden benötigt' });
  }

  const [{ id }] = await model.addKennzeichenKfz(req.body);

  if (id > 0) {
    return res.status(200).json({
      code: 200,
      data: 'Wurde erfolgreich hinzugefügt',
      kennzeichenId: id,
    });
  }
  return res.status(500).json({ code: 500, data: 'Server Error' });
});

module.exports = {
  addKennzeichenKfz,
  getKennzeichenKfz,
};

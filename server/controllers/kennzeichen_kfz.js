const asyncHandler = require('express-async-handler');
const model = require('../model/kennzeichen_kfz');

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
};

const asyncHandler = require('express-async-handler');
const model = require('../model/kennzeichen');

const getKennzeichen = asyncHandler(async (req, res) => {
  console.log(req.query);
  return res.status(200).json(await model.getKennzeichen());
});

module.exports = {
  getKennzeichen,
};

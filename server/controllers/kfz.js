const asyncHandler = require('express-async-handler');
const model = require('../model/kfz.js');

const getCars = asyncHandler(async (req, res) => {
  const x = await model.getCars();
  console.log(x);
  return res.status(200).json(x);
});

module.exports = {
  getCars,
};

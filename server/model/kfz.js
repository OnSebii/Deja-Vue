const db = require('../db');

const getCars = async () => {
  const { rows } = await db.query('select * from kfz;');
  return rows;
};

module.exports = {
  getCars,
};

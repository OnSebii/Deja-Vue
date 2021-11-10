const db = require('../db');

const getKennzeichen = async () => {
  const { rows } = await db.query('select * from kennzeichen;');
  return rows;
};

module.exports = {
  getKennzeichen,
};

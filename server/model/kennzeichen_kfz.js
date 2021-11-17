const db = require('../db');

const addKennzeichenKfz = async (body) => {
  const { rows } = await db.query('insert into kennzeichen_kfz (kennzeichenId, kfzId) values($1, $2);', [body.knzid, body.kfzid]);
  return rows;
};

module.exports = {
  addKennzeichenKfz,
};

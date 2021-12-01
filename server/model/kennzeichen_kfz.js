const db = require('../db');

const getKennzeichenKfz = async (id) => {
  if (id !== undefined) {
    const { rows } = await db.query(
      'select k.id, bezirk, nummer, modell, marke, gesehen from kennzeichen_kfz join kennzeichen k on k.id = kennzeichen_kfz.kennzeichenId join kfz k2 on kennzeichen_kfz.kfzId = k2.id where k.id = $1',
      [id],
    );
    return rows;
  }
  const { rows } = await db.query(
    'select k.id, bezirk, nummer, modell, marke, gesehen from kennzeichen_kfz join kennzeichen k on k.id = kennzeichen_kfz.kennzeichenId join kfz k2 on kennzeichen_kfz.kfzId = k2.id',
  );
  return rows;
};

const addKennzeichenKfz = async (body) => {
  const { rows } = await db.query('insert into kennzeichen_kfz (kennzeichenId, kfzId) values($1, $2);', [body.knzid, body.kfzid]);
  return rows;
};

module.exports = {
  addKennzeichenKfz,
  getKennzeichenKfz,
};

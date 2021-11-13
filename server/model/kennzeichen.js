const db = require('../db');

const getKennzeichen = async (id) => {
  if (id !== undefined) {
    const { rows } = await db.query('select * from kennzeichen where id = $1', [id]);
    return rows;
  }
  const { rows } = await db.query('select * from kennzeichen;');
  return rows;
};

const addKennzeichen = async (body) => {
  const { rows } = await db.query('insert into kennzeichen (bezirk, nummer) values($1, $2) returning id', [body.bezirk, body.nummer]);
  return rows;
};

const deleteKennzeichen = async (id) => {
  const { rows } = await db.query('delete from kennzeichen where id = $1 returning bezirk || nummer as kennzeichen', [id]);
  return rows;
};

module.exports = {
  getKennzeichen,
  addKennzeichen,
  deleteKennzeichen,
};

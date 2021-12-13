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

const updateKennzeichen = async (body, id) => {
  let upd = [];
  for (key in body) upd.push(`${key} = '${body[key]}'`);
  const cmd = 'update kennzeichen set ' + upd.join(', ') + ' where id = $1';
  console.log(cmd);
  await db.query(cmd, [id]);

  return '';
};

module.exports = {
  getKennzeichen,
  addKennzeichen,
  deleteKennzeichen,
  updateKennzeichen,
};

const db = require('../db');

const getCars = async (id) => {
  if (id !== undefined) {
    const { rows } = await db.query('select * from kfz where id = $1', [id]);
    return rows;
  }
  const { rows } = await db.query('select * from kfz;');
  return rows;
};

const addCar = async (body) => {
  const { rows } = await db.query('insert into kfz (marke, modell, gesehen) values($1, $2, $3) returning id', [body.marke, body.modell, body.gesehen]);
  return rows;
};

const deleteCar = async (id) => {
  const { rows } = await db.query('delete from kfz where id = $1 returning marke || || modell as car', [id]);
  return rows;
};

const updateCar = async (body, id) => {
  const { rows } = await db.query('select kfzid from kennzeichen_kfz where kennzeichenId = $1', [id]);

  let upd = [];
  for (key in body) upd.push(`${key} = '${body[key]}'`);
  const cmd = 'UPDATE kfz SET ' + upd.join(', ') + ' where id = $1';
  await db.query(cmd, [rows[0].kfzid]);

  return '';
};

module.exports = {
  getCars,
  addCar,
  deleteCar,
  updateCar,
};

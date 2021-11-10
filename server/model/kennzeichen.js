const db = require('../db');

const getKennzeichen = async () => {
  const { rows } = await db.query('select * from kennzeichen;');
  return rows;
};

const addKennzeichen = async () => {
  const { rows } = await db.query('select * from kennzeichen;');
  return rows;
};

async function addCar(e) {
  try {
    const { rows } = await db.query('select max(id) as max from cars');
    const carId = rows[0].max + 1;

    const id = await getOwnerId(e.owner);

    if (id === null) {
      return {
        code: 404,
        data: 'Owner not found',
      };
    }

    await db.query('insert into cars (id, title, image, status, price, miles, year_of_make, description, owner) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
      carId,
      e.title,
      e.image,
      e.status,
      e.price,
      e.miles,
      e.yearOfMake,
      e.description,
      id,
    ]);

    return {
      code: 200,
      data: `Car added with id ${carId}`,
    };
  } catch (err) {
    return {
      code: 500,
      data: `Error while adding car. Error: ${err.message}`,
    };
  }
}

module.exports = {
  getKennzeichen,
  addKennzeichen,
};

const db = require('../db');

const getMovies = async () => {
  const { rows } = await db.query('SELECT * from movies');
  return rows;
};

const getActors = async () => {
  const { rows } = await db.query('SELECT * from actors');
  return rows;
};

const getMovieActors = async (movieTitle) => {
  const { rows } = await db.query(
    'select name from movies_actors join actors a on movies_actors.actor_id = a.id join movies m on movies_actors.movie_id = m.id where movie_id = $1;',
    [movieTitle],
  );
  return rows;
};

const postActor = async (reqBody) => {
  const { rows } = await db.query('insert into actors (name, born, image) values ($1, $2, $3) returning *;', [reqBody.name, reqBody.born, reqBody.image]);
  return rows;
};

const checkActorsName = async (name) => {
  const { rows } = await db.query('select name from actors where name = $1;', [name]);
  return rows;
};

const checkActorsId = async (id) => {
  const { rows } = await db.query('select name from actors where id = $1;', [id]);
  return rows;
};

const deleteActor = async (id) => {
  const { rows } = await db.query('delete from actors where id = $1;', [id]);
  return rows;
};

module.exports = {
  getMovies,
  getActors,
  getMovieActors,
  postActor,
  deleteActor,
  checkActorsName,
  checkActorsId,
};

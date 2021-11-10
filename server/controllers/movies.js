const asyncHandler = require('express-async-handler');
const model = require('../model/movies');

const getMovies = asyncHandler(async (req, res) => {
  console.log(req.query);
  return res.status(200).json(await model.getMovies());
});

const getActors = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getActors());
});

const getMovieActors = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getMovieActors(req.params.id));
});

const postActor = asyncHandler(async (req, res) => {
  if (req.body.name === '' || req.body.actor === '' || req.body.image === '') {
    return res.status(400).send('Content body is empty');
  }

  const check = await model.checkActorsName(req.body.name);

  if (check[0] !== undefined) return res.status(200).send('Name ist bereits vorhanden.');

  res.status(201).json(await model.postActor(req.body));
});

const deleteActor = asyncHandler(async (req, res) => {
  const check = await model.checkActorsId(req.params.id);

  if (check[0] === undefined) return res.status(404).send('Diesen Actor gibt es nicht.');

  await model.deleteActor(req.params.id);
  res.status(204).end();
});

module.exports = {
  getMovies,
  getActors,
  getMovieActors,
  postActor,
  deleteActor,
};

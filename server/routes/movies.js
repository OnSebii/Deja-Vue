const express = require('express');
const { getMovies, getActors, getMovieActors, postActor, deleteActor } = require('../controllers/movies');

const router = express.Router();

router.get('/movies', getMovies);

router.get('/movies/:id/actors', getMovieActors);

router.get('/actors', getActors);

router.post('/actors', postActor);

router.delete('/actors/:id', deleteActor);

module.exports = router;

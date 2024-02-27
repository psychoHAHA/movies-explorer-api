const router = require('express').Router()
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies')
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/movieValidation')

router.get('/movies', getMovies)
router.post('/movies', validateCreateMovie, createMovie)
router.delete('/movies/:movieId', validateDeleteMovie, deleteMovie)

module.exports = router

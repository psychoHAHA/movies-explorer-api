const movie = require('../models/movie')
const ErrorNotFound = require('../errors/errorNotFound')
const ErrorValidation = require('../errors/errorValidation')
const ErrorForbiden = require('../errors/errorForbidden')

const getMovies = async (req, res, next) => {
  try {
    const movies = await movie.find({ owner: req.user._id })

    if (!movies) {
      throw new ErrorNotFound('Фильмы не были найдены')
    } else {
      res.send(movies)
    }
  } catch (error) {
    next(error)
  }
}

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id
    const creatingMovie = await movie.create({ owner, ...req.body })

    res.send(creatingMovie)
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ErrorValidation('Ошибка валидации полей')
    } else {
      next(error)
    }
  }
}

const deleteMovie = async (req, res, next) => {
  try {
    const userId = req.user._id // находим id юзера
    const findMovie = await movie // находим фильм с таким id
      .findById(req.params._id)
      .orFail(() => new ErrorNotFound('Фильм для удаления не найден'))

    if (!findMovie.owner.equals(userId)) {
      throw new ErrorForbiden('Вы не можете удалить чужой фильм') // если владелец !== id юзера, то отправляем ошибку
    } else {
      const delMovie = await movie.deleteOne()
      res.send(delMovie) // если нашли удаляем ее и отправляем ответ об этом
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
}

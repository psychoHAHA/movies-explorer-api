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

// const deleteMovie = async (req, res, next) => {
//   try {
//     const userId = req.user._id // находим id юзера
//     const newMovieId = req.params.movieId // находим id фильма
//     const findMovie = await movie // находим фильм с таким id
//       .findById(newMovieId)
//       .orFail(() => new ErrorNotFound('Фильм для удаления не найден'))

//     if (!findMovie.owner.equals(userId)) {
//       throw new ErrorForbiden('Вы не можете удалить чужой фильм') // если владелец !== id юзера, то отправляем ошибку
//     } else {
//       const delMovie = await movie.deleteOne()
//       return res.send(delMovie) // если нашли удаляем ее и отправляем ответ об этом
//     }
//   } catch (error) {
//     next(error)
//   }
// }

const deleteMovie = async (req, res, next) => {
  try {
    const userId = req.user._id // находим id юзера
    const movieId = req.params.movieId // находим id фильма
    const findMovie = await movie // находим фильм с таким id
      .findById(movieId)
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

// const deleteMovie = (req, res, next) => {
//   const objectID = req.params.movieId;
//   movie.findById(objectID)
//     .then((movie) => {
//       if (!movie) {
//         throw new ErrorNotFound(ERROR_NOTFOUND_MESSAGE_MOVIE);
//       }
//       if (!movie.owner.equals(req.user._id)) {
//         throw new ErrorForbiden(ERROR_FORBIDDEN_MESSAGE_MOVIE);
//       }
//       movie.deleteOne(movie)
//         .then(() => {
//           res.status(httpConstants.HTTP_STATUS_OK).send(movie);
//         })
//         .catch((err) => {
//           if (err instanceof mongoose.Error.DocumentNotFoundError) {
//             next(new ErrorNotFound(ERROR_NOTFOUND_MESSAGE_MOVIE));
//           } else {
//             next(err);
//           }
//         });
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.CastError) {
//         next(new BadRequest(ERROR_BADREQUEST_MESSAGE));
//       } else {
//         next(err);
//       }
//     });

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
}

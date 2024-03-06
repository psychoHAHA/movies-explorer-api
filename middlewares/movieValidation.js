const { celebrate, Joi } = require('celebrate')

const { URLRegExpression } = require('../utils/constants')

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(new RegExp(URLRegExpression)).required(),
    trailerLink: Joi.string().pattern(new RegExp(URLRegExpression)).required(),
    thumbnail: Joi.string().pattern(new RegExp(URLRegExpression)).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  })
}),

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
})

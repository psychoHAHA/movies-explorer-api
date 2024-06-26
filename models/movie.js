const mongoose = require('mongoose')
const { URLRegExpression } = require('../utils/constants')

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [URLRegExpression, 'Некорректная ссылка'],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [URLRegExpression, 'Некорректная ссылка'],
  },
  thumbnail: {
    type: String,
    required: true,
    match: [URLRegExpression, 'Некорректная ссылка'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema)

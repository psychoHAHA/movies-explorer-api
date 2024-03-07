const mongoose = require('mongoose')

const helmet = require('helmet')

const { errors } = require('celebrate')

const express = require('express')

const cors = require('cors')

const router = require('./routes/index')

const { errorHandle } = require('./middlewares/errorHandler')
const { errorLogger, requestLogger } = require('./middlewares/logger')

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } =
  process.env

const app = express()

// const options = {
//   origin: [
//     '[undefined](http://localhost:3000)',
//     'https://psychodelic.movie.nomoredomainswork.ru',
//     'https://psychoHAHA.github.io',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
//   credentials: true,
// }

app.use(cors())

app.use(helmet())

mongoose.connect(MONGO_URL)

app.use(requestLogger)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(errors())

app.use(errorLogger)

app.use(errorHandle)

app.listen(PORT, () => {
  console.log(`listener on port ${PORT}`)
})

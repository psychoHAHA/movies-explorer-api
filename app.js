const express = require('express')
const mongoose = require('mongoose')
const { errors } = require('celebrate')
const bodyParser = require('body-parser')
const cors = require('cors')
const { errorLogger, requestLogger } = require('./middlewares/logger')
const { errorHandle } = require('./middlewares/errorHandler')
const routes = require('./routes')

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } =
  process.env

const app = express()

app.use(requestLogger)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use('/', routes)

app.use(errors())

app.use(errorLogger)

app.use(errorHandle)

mongoose.connect(MONGO_URL)

app.listen(PORT, () => {
  console.log(`listener on port ${PORT}`)
})

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { errorLogger, requestLogger } = require('./middlewares/logger');
// const { errorHandle } = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(requestLogger);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(errors())

app.use(errorLogger)

// app.use(errorHandle)

app.listen(PORT, () => {
  console.log(`listener on port ${PORT}`);
});
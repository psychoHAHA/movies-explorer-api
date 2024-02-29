const express = require('express');
// const cors = require('./middlewares/cors');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { errorHandle } = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());

// app.use(cors({
//   origin: ['http://localhost:3000', 'https://psychodelic.movie.nomoredomainswork.ru'],
//   credentials: true,
//   maxAge: 30,
// }));

app.use(cors());

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errors());

app.use(errorLogger);

app.use(errorHandle);

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
  console.log(`listener on port ${PORT}`);
});

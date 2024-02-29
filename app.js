const express = require('express');
const { errors } = require('celebrate');
// const cors = require('./middlewares/cors');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { errorHandle } = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());
const options = {
  origin: [
    '[undefined](http://localhost:3000)',
    'https://api.psychodelic.movie.nomoredomainsmonster.ru'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],  
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],  
  credentials: true,
};

app.use(cors(options));

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

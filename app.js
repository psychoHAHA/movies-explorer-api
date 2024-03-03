const mongoose = require('mongoose');

const helmet = require('helmet');

const { errors } = require('celebrate');

const express = require('express');

const cors = require('cors');

const router = require('./routes/index');

const { errorHandle } = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://psychodelic.movie.nomoredomainswork.ru'],
//   credentials: true,
//   maxAge: 30,
// }));

// app.use(cors(corsOptions));

mongoose.connect(MONGO_URL);

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errors());

app.use(errorLogger);

app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`listener on port ${PORT}`);
});

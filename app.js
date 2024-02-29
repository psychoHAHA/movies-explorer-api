const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors')
const router = require('./routes/index');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { errorHandle } = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());

app.use(cors());

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

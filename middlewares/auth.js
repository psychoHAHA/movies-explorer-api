const jwt = require('jsonwebtoken')

const ErrorAuth = require('../errors/errorAuth')

const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  let payload

  try {
    const token = req.headers.authorization

    if (!token) {
      throw new ErrorAuth('Необходимо пройти авторизацию!')
    }

    const validToken = token.replace('Bearer ', '')

    payload = jwt.verify(validToken, JWT_SECRET)
  } catch (error) {
    throw new ErrorAuth("Необходимо пройти авторизацию")
  }

  req.user = payload

  next()
};


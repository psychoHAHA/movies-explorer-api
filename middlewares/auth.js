const jwt = require('jsonwebtoken')

const ErrorAuth = require('../errors/errorAuth')

// const { JWT_SECRET, NODE_ENV = '' } = process.env

// module.exports = (req, res, next) => {
//   let payload

//   try {
//     const token = req.headers.authorization

//     if (!token) {
//       throw new ErrorAuth('Необходимо пройти авторизацию')
//     }

//     const validToken = token.replace('Bearer ', '')

//     payload = jwt.verify(validToken, JWT_SECRET)
//   } catch (error) {
//     throw new ErrorAuth('Необходимо пройти авторизацию')
//   }

//   req.user = payload

//   next()
// };

const { JWT_SECRET, NODE_ENV = '' } = process.env

module.exports = (req, res, next) => {
  let payload

  try {
    const token = req.headers.authorization

    if (!token) {
      throw new ErrorAuth('Необходимо пройти авторизацию!')
    }

    const validToken = token.replace('Bearer ', '')

    payload = jwt.verify(validToken, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')
  } catch (error) {
    throw new ErrorAuth("Необходимо пройти авторизацию")
  }

  req.user = payload

  next()
};

// const { JWT_SECRET, NODE_ENV = '' } = process.env

// module.exports = (req, res, next) => {
//   let payload

//   try {
//     const { authorization } = req.headers

//     if (!authorization || !authorization.startsWith('Bearer ')) {
//       throw new ErrorAuth('Необходимо пройти авторизацию')
//     }

//     const token = authorization.replace('Bearer ', '')
//     payload = jwt.verify(token, JWT_SECRET)
//   } catch (error) {
//     return next(error)
//   }

//   req.user = payload

//   return next()
// }

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env;

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, {
  expiresIn: '7d',
})

module.exports = generateToken
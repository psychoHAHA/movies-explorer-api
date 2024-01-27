const router = require('express').Router()
const userRouter = require('./users')
const movieRouter = require('./movies')
const auth = require('../middlewares/auth')
const { createUser, login } = require('../controllers/users')
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/userValidation')

router.post('/signup', validateCreateUser, createUser)
router.post('/signin', validateLogin, login)

router.use(auth)
router.use('/users', userRouter)
router.use('/movies', movieRouter)

router.use(auth, userRouter)
router.use(auth, movieRouter)

module.exports = router

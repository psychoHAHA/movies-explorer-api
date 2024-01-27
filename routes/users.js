const router = require('express').Router()
const { getUsers, updateUser } = require('../controllers/users')
const {
  validateUserInfo,
  validateGetUser,
} = require('../middlewares/userValidation')

router.get('/users/me', validateGetUser, getUsers)
router.patch('/users/me', validateUserInfo, updateUser)

module.exports = router

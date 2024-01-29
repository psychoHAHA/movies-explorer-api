const router = require('express').Router();
const { getUsers, updateUser } = require('../controllers/users');
const { validateUserInfo } = require('../middlewares/userValidation');

router.get('/users/me', getUsers);
router.patch('/users/me', validateUserInfo, updateUser);

module.exports = router;

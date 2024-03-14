
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/jwt')
const user = require('../models/user')

const ErrorNotFound = require('../errors/errorNotFound');
const ErrorValidation = require('../errors/errorValidation');
const ErrorConflict = require('../errors/errorConflict');
const ErrorAuth = require('../errors/errorAuth');

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const getUsers = async (req, res, next) => {
  try {
    const userName = await user.findById(req.user._id);

    if (!userName) {
      throw new ErrorNotFound('Пользователь по ID не найден');
    }
    res.status(200).send(userName);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ErrorValidation('Ошибка валидации полей'));

      return;
    }

    next(error);
  }
};

// const getUsers = (req, res, next) =>
//   user
//     .findById(req.user._id)
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((error) => {
//       if (error instanceof mongoose.Error.DocumentNotFoundError) {
//         return next(new ErrorNotFound('Пользователь не найден'))
//       }

//       if (error.name === 'ValidationError') {
//         next(new ErrorValidation('Ошибка валидации полей'))

//         return
//       }
//     })

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    const updatingUser = await user.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatingUser) {
      throw new ErrorNotFound('Пользователь по ID не найден');
    } else {
      res.send(updatingUser);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ErrorValidation('Ошибка валидации полей'));
    } else {
      next(error);
    }
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const userName = await user.create({
      name,
      email,
      password: passwordHash,
    });

    res.status(200).send({
      user: {
        name: userName.name,
        email: userName.email,
      },
    });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ErrorConflict('Такой пользователь уже существует'));
    } else if (error.name === 'ValidationError') {
      next(new ErrorValidation('Ошибка валидации полей'));
    } else {
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userName = await user
      .findOne({ email })
      .select('+password')
      .orFail(() => new ErrorAuth('Неправильные email или password'));

    const matched = await bcrypt.compare(String(password), userName.password);

    if (!matched) {
      throw new ErrorAuth('Неправильные email или password');
    }

    const token = generateToken({
      _id: userName._id,
      email: userName.email,
    });

    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

// const login = (req, res, next) => {
//   const { email, password } = req.body
//   return user
//     .findOne({ email })
//     .select('+password')
//     .orFail()
//     .then(async (user) => {
//       const matched = await bcrypt.compare(String(password), user.password)
//       if (!matched) {
//         throw new ErrorValidation('Неправлиьные почта или пароль')
//       }

//       const token = generateToken({ _id: user._id })
//       res.send({ token })
//     })
//     .catch((error) => {
//       if (error instanceof mongoose.Error.DocumentNotFoundError) {
//         return next(new ErrorValidation('Неправлиьные почта или пароль'))
//       }

//       return Promise.reject(error)
//     })
// }

module.exports = {
  getUsers,
  updateUser,
  createUser,
  login,
};

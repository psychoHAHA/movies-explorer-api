const jwt = require('jsonwebtoken')

const ErrorAuth = require('../errors/errorAuth')

const { JWT_SECRET = 'dev-secret-key' } = process.env

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


// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import '../Auth/Auth.css'
// import logo from '../../images/logo.svg'

// export default function Register({ onRegister }) {
//   const [formValue, setFormValue] = useState({
//     name: '',
//     email: '',
//     password: '',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target

//     setFormValue({
//       ...formValue,
//       [name]: value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const { name, email, password } = formValue
//     console.log(formValue)
//     onRegister(name, email, password)
//   }

//   return (
//     <div className="auth">
//       <Link to="/" className="auth__link">
//         <img src={logo} alt="logo" className="auth__logo"></img>
//       </Link>

//       <h1 className="auth__title">Добро пожаловать!</h1>

//       <form className="auth__form" onSubmit={handleSubmit}>
//         <div className="auth__inputs">
//           <label className="auth__label" htmlFor="name">
//             Имя
//           </label>
//           <input
//             type="name"
//             name="name"
//             className="auth__input"
//             required
//             value={formValue.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="auth__inputs">
//           <label className="auth__label" htmlFor="email">
//             E-mail
//           </label>
//           <input
//             type="email"
//             name="email"
//             className="auth__input"
//             required
//             value={formValue.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="auth__inputs">
//           <label className="auth__label" htmlFor="password">
//             Пароль
//           </label>
//           <input
//             type="password"
//             name="password"
//             className="auth__input"
//             required
//             value={formValue.password}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="auth__button">
//           Зарегистроваться
//         </button>
//       </form>
//       <p className="auth__text">
//         Уже зарегистрированы?
//         <a href="/signin" className="auth__link">
//           Войти
//         </a>
//       </p>
//     </div>
//   )
// }

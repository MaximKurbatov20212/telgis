import { React, useContext, useState } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';

import telgis from '../images/welcomeTelgis.png'
import UserService from '../api/UserService';
import "./AuthForm.css"
import { UserInfoContext } from '../context/UserInfoContext';

export const RegisterForm = () => {
	const [registerFields, setRegisterFields] = useState({ login: '', password: '', confirmPassword: '' })
	const {userInfo, setUserInfo} = useContext(UserInfoContext)
	const { notification, setNotification } = useContext(NotificationContext)
	const { isAuth, setIsAuth } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (registerFields.password !== registerFields.confirmPassword) {
      setNotification('Пароли не совпадают')
			return
		}

		const data = await UserService.postNewUser(registerFields.login, registerFields.password);

		if (data) {
			setIsAuth(true)
			setUserInfo( { login : registerFields.login, password : registerFields.password } )
      setNotification('Успешная регистрация!!!');
		}
		else {
			setNotification('Ошибка при регистрации учетки')
			// setIsAuth(true)
		}
	}

	return (
		<main className="main">
			<div className="authorization-container">
				<img src={telgis} alt="telgis" />

				<form className="form-container" onSubmit={handleSubmit}>
					<h1 className="registration">Регистрация</h1>
					
					<input
						type="text"
						className="form-item"
						placeholder="Логин"
						value={registerFields.login}
						onChange={e => setRegisterFields({ ...registerFields, login: e.target.value })}
					/>

					<input
						type="password"
						className="form-item"
						placeholder="Пароль"
						value={registerFields.password}
						onChange={e => setRegisterFields({ ...registerFields, password: e.target.value })}
					/>
					
					<input
						type="password"
						className="form-item"
						placeholder="Введите пароль ещё раз"
						value={registerFields.confirmPassword}
						onChange={e => setRegisterFields({ ...registerFields, confirmPassword: e.target.value })}
					/>

					<button className="btn">Зарегистрироваться</button>

					<p className="change-form">
							<span> Есть учетная запись? </span>
							<Link to="/login"> Войти </Link>
					</p>

				</form>
			</div>
		</main>
	)
}
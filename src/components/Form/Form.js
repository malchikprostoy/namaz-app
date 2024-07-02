import React, { useContext } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './Form.scss'
import { CustomContext } from '../../utils/Context'

function Form() {
	const navigate = useNavigate()
	const location = useLocation()
	const { setUser, user } = useContext(CustomContext)
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' })

	const registerUser = data => {
		axios
			.post('http://localhost:4000/users', {
				...data,
				categories: [],
			})
			.then(res => {
				setUser({
					...res.data,
				})
				localStorage.setItem('user', JSON.stringify(res.data))
				reset()
				navigate('/')
			})
			.catch(err => console.log(err))
	}

	const loginUser = data => {
		axios
			.get('http://localhost:4000/users', {
				params: {
					email: data.email,
					password: data.password,
				},
			})
			.then(res => {
				const user = res.data[0]
				if (user) {
					setUser(user)
					localStorage.setItem('user', JSON.stringify(user))
					reset()
					navigate('/')
				} else {
					console.log('User not found')
				}
			})
			.catch(err => console.log(err))
	}

	const onSubmit = data => {
		location.pathname === '/register' ? registerUser(data) : loginUser(data)
	}

	if (user && user.email) {
		return <Navigate to='/' />
	}

	return (
		<form noValidate className='form' onSubmit={handleSubmit(onSubmit)}>
			<h2 className='form__title'>
				{location.pathname === '/register' ? 'Регистрация' : 'Вход'}
			</h2>
			{location.pathname === '/register' && (
				<>
					<input
						{...register('login', {
							required: { value: true, message: 'You need to fill login form' },
							maxLength: { value: 10, message: 'max 10 letters' },
							minLength: { value: 3, message: 'min 3 letters' },
						})}
						className='form__field'
						type='text'
						placeholder='Введите имя'
					/>
					<p className='form__error'>{errors.login && errors.login.message}</p>
				</>
			)}
			<input
				{...register('email', {
					required: { value: true, message: 'You need to fill login form' },
					maxLength: { value: 20, message: 'max 20 letters' },
					minLength: { value: 3, message: 'min 3 letters' },
					pattern: {
						value: /^[^]+@[^]+\.[a-z]{2,5}$/,
						message: 'Напишите правильный email',
					},
				})}
				className='form__field'
				type='email'
				placeholder='Введите почту'
			/>
			<p className='form__error'>{errors.email && errors.email.message}</p>
			<input
				{...register('password', {
					required: { value: true, message: 'You need to fill login form' },
					maxLength: { value: 20, message: 'max 20 letters' },
					minLength: { value: 3, message: 'min 3 letters' },
					pattern: {
						value:
							/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
						message:
							'Пароль должен содержать не менее 3 символов, заглавную букву, число!',
					},
				})}
				className='form__field'
				type='password'
				placeholder='Введите пароль'
			/>
			<p className='form__error'>
				{errors.password && errors.password.message}
			</p>
			<button type='submit' className='form__btn'>
				{location.pathname === '/register' ? 'Зарегистрироваться' : 'Войти'}
			</button>
			<p className='form__text'>
				{location.pathname === '/register' ? (
					<>
						У вас уже есть аккаунт?
						<Link className='form__link' to='/login'>
							Войти
						</Link>
					</>
				) : (
					<>
						Если у вас нет аккаунта, пройдите
						<Link className='form__link' to='/register'>
							регистрацию.
						</Link>
					</>
				)}
			</p>
		</form>
	)
}

export default Form

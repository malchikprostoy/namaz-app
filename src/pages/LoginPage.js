// LoginComponent.js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/prayersSlice'

const LoginComponent = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		// Simulate authentication (replace with actual authentication logic)
		if (username === 'admin' && password === 'password') {
			dispatch(login({ username: 'admin' })) // Dispatch action on successful login
		} else {
			alert('Invalid credentials')
		}
	}

	return (
		<div>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export default LoginComponent

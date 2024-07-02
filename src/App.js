import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import './App.css'

function App() {
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App

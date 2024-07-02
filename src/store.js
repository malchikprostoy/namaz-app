import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice' // Путь к вашему слайсу пользователя

const store = configureStore({
	reducer: {
		user: userReducer,
	},
})

export default store

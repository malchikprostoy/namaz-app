import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	user: null,
}

const prayersSlice = createSlice({
	name: ['prayers', 'auth'],
	initialState,
	reducers: {
		markPrayer: (state, action) => {
			const { date, prayer } = action.payload
			if (!state[date]) {
				state[date] = {}
			}
			state[date][prayer] = !state[date][prayer]
			localStorage.setItem('prayers', JSON.stringify(state))
		},
		login: (state, action) => {
			state.isAuthenticated = true
			state.user = action.payload
		},
		logout: state => {
			state.isAuthenticated = false
			state.user = null
		},
	},
})

export const { markPrayer } = prayersSlice.actions
export const { login, logout } = prayersSlice.actions
export default prayersSlice.reducer

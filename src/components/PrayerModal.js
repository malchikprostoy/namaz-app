// PrayerModal.js
import React from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { markPrayer } from '../features/prayersSlice'
import './Сalendar.css'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		maxWidth: '90%',
		padding: '20px',
		backgroundColor: 'white',
		borderRadius: '8px',
	},
}

const PrayerModal = ({ date, isOpen, onRequestClose }) => {
	const dispatch = useDispatch()
	const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
	const markedPrayers = useSelector(state => state.prayers[date] || {}) // Выбираем данные молитв для определенной даты из Redux store

	const handleMarkPrayer = prayer => {
		dispatch(markPrayer({ date, prayer }))
	}

	return (
		<Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
			<h2>Select Prayer for {date}</h2>
			{prayers.map(prayer => (
				<button
					key={prayer}
					onClick={() => handleMarkPrayer(prayer)}
					style={{
						backgroundColor: markedPrayers[prayer] ? 'black' : 'grey',
						color: markedPrayers[prayer] ? 'white' : 'black',
						marginBottom: '10px',
						width: '100%',
						padding: '10px',
						borderRadius: '4px',
					}}
				>
					{prayer}
				</button>
			))}
		</Modal>
	)
}

export default PrayerModal

// PrayerCalendar.js
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import PrayerModal from './PrayerModal'
import { useSelector } from 'react-redux'
import './Сalendar.css' // Подключаем стили для календаря

const PrayerCalendar = () => {
	const [selectedDate, setSelectedDate] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleDateClick = date => {
		setSelectedDate(date)
		setIsModalOpen(true)
	}

	// Получаем данные о выбранных молитвах из хранилища
	const prayers = useSelector(state => state.prayers)

	// Функция для проверки, выбраны ли все молитвы для данного дня
	const areAllPrayersSelected = date => {
		const selectedPrayers = prayers[date] || {}
		return (
			Object.keys(selectedPrayers).length === 5 &&
			Object.values(selectedPrayers).every(value => value === true)
		)
	}

	// Функция для установки класса или стиля дня в календаре
	const tileClassName = ({ date }) => {
		if (areAllPrayersSelected(date.toDateString())) {
			return 'calendar-tile-green' // Класс для зеленого фона
		}
		return '' // Пустой класс, если не все молитвы выбраны
	}

	return (
		<div className='calendar-container'>
			<Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />
			{selectedDate && (
				<PrayerModal
					date={selectedDate.toDateString()}
					isOpen={isModalOpen}
					onRequestClose={() => setIsModalOpen(false)}
				/>
			)}
		</div>
	)
}

export default PrayerCalendar

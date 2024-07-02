import React from 'react'
import PrayerCalendar from '../components/Calendar'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
	return (
		<div className='d-flex flex-column align-items-center justify-content-center gap-5 h-100 w-100'>
			<h1>Calendar</h1>
			<PrayerCalendar />
		</div>
	)
}

export default Home

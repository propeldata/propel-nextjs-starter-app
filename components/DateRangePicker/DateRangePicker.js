import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import styles from './DateRangePicker.module.css'
import { LocalizationProvider } from '@mui/x-date-pickers'

export default function DateRangePicker(props) {
  const { startDate, stopDate, setStartDate, setStopDate } = props

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleStopDateChange = (date) => {
    setStopDate(date)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.pickersWrapper}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          format="dd/MM/yyyy"
          label="From"
          views={['year', 'month', 'day']}
        />
        <DatePicker
          value={stopDate}
          onChange={handleStopDateChange}
          format="dd/MM/yyyy"
          label="To"
          views={['year', 'month', 'day']}
        />
      </div>
    </LocalizationProvider>
  )
}

import React from "react"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import styles from "./DateRangePicker.module.css"

export default function DateRangePicker (props) {
  const { startDate, stopDate, setStartDate, setStopDate } = props

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleStopDateChange = (date) => {
    setStopDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={styles.pickersWrapper}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          format="dd/MM/yyyy"
          label="From"
          views={["year", "month", "date"]}
        />
        <DatePicker
          value={stopDate}
          onChange={handleStopDateChange}
          format="dd/MM/yyyy"
          label="To"
          views={["year", "month", "date"]}
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

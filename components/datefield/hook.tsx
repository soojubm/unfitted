import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { filteredDateState } from 'domain/page2/CustomDateChip'
import { getYesterdayDate } from 'services/date'

const INITIAL_START_DATE = getYesterdayDate()
const INITIAL_END_DATE = getYesterdayDate()

export function useDateRange() {
  const [filteredDate, setFilteredDate] = useRecoilState(filteredDateState)

  const [startDate, setStartDate] = useState(filteredDate.startDate)
  const [endDate, setEndDate] = useState(filteredDate.endDate)

  const handleDateRangeChange = (dates: Date[]) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)

    // setFilteredDate({ startDate: start, endDate: end })
  }

  return [startDate, endDate, handleDateRangeChange]
}

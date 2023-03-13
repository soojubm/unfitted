import { atom } from 'recoil'

import Datefield from 'components/datefield'

import { useDateRange } from 'components/datefield/hook'
import { getYesterdayDate } from 'services/date'

const INITIAL_STATE: any = {
  startDate: getYesterdayDate(),
  endDate: getYesterdayDate(),
}
export const filteredDateState = atom({
  key: 'filteredDateState',
  default: INITIAL_STATE,
})

function CustomDateChip() {
  const [startDate, endDate, handleDateRangeChange] = useDateRange()

  return <Datefield startDate={startDate} endDate={endDate} onChange={handleDateRangeChange} />
}

export default CustomDateChip

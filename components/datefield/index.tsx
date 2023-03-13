import Image from 'next/image'

import DatePicker from 'react-datepicker'

import { getYesterdayDate } from 'services/date'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

import styles from '../textfield/Textfield.module.css'

interface DatefieldProps {
  startDate: Date | any
  endDate: Date | any
  onChange: any
}

function Datefield(props: DatefieldProps) {
  return (
    <div className={styles.textfield} data-size="small">
      <div className={styles.prefix}>
        <Image src="/calendar.svg" alt="" width="18" height="18" />
      </div>
      <DatePicker
        dateFormat="yyyy. MM. dd"
        startDate={props.startDate}
        endDate={props.endDate}
        onChange={props.onChange}
        selectsRange
        maxDate={getYesterdayDate()}
        // todayButton="Today"
      />
    </div>
  )
}

export default Datefield

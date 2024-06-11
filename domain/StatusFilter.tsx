import { atom } from 'recoil'
import {
  STATUS_1_VALUE,
  STATUS_2_VALUE,
  STATUS_3_VALUE,
} from 'services/constants'
import MultipleFilterField from './filters/MultipleFilterField'
import { useRouter } from 'next/router'

const INITIAL_STATE = STATUS_1_VALUE

export const statusState = atom({
  key: 'statusState',
  default: INITIAL_STATE,
})

const statusOptions = [
  { name: 'statusFilter', value: STATUS_1_VALUE, label: '상태1' },
  { name: 'statusFilter', value: STATUS_2_VALUE, label: '상태2' },
  { name: 'statusFilter', value: STATUS_3_VALUE, label: '상태3' },
]

function StatusFilter() {
  const router = useRouter()

  return (
    <MultipleFilterField
      options={statusOptions}
      initialState={INITIAL_STATE}
      state={statusState}
    />
  )
}

export default StatusFilter

// export function getServerSideProps({ params: { params } }) {
//   return {
//     props: {
//       params,
//     },
//   }
// }

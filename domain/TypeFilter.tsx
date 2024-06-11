import MultipleFilterField from 'domain/filters/MultipleFilterField'
import { atom } from 'recoil'

import { TYPE_FILTER_NAME } from 'services/constants'

const INITIAL_STATE = 'all'

export const tabOptions: Option[] = [
  { label: '전체', value: INITIAL_STATE },
  { label: 'type1', value: 'type1' },
  { label: 'type2', value: 'type2' },
]

export const typeState = atom({
  key: 'typeState',
  default: INITIAL_STATE,
})

function TypeFilter() {
  return (
    <MultipleFilterField
      options={tabOptions}
      initialState={INITIAL_STATE}
      state={typeState}
    />
  )
}

export default TypeFilter

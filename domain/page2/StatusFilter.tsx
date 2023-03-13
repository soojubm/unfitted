import { atom } from 'recoil'
import { useTranslation } from 'next-i18next'
import { STATUS_1_VALUE, STATUS_2_VALUE, STATUS_3_VALUE } from 'services/constants'
import MultipleFilterField from '../filters/MultipleFilterField'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const INITIAL_STATE = STATUS_1_VALUE

export const statusState = atom({
  key: 'statusState',
  default: INITIAL_STATE,
})

function StatusFilter() {
  const router = useRouter()

  const statusOptions = [
    { name: 'statusFilter', value: STATUS_1_VALUE, label: '상태1' },
    { name: 'statusFilter', value: STATUS_2_VALUE, label: '상태2' },
    { name: 'statusFilter', value: STATUS_3_VALUE, label: '상태3' },
  ]

  // TODO 전체를 다시 랜더링하는 이유?
  // useEffect(() => {
  //   const filterName = statusOptions[0].name
  //   console.log('filterValue', router.query[filterName])
  // }, [router.query])

  // aha 컴포넌트는 단순 재사용이 아니라 필수 값을 prop로 알려주는 기능도 한다.
  return (
    <MultipleFilterField options={statusOptions} initialState={INITIAL_STATE} state={statusState} />
    // <Select
    //   hiddenLabel
    //   name={STATUS_FILTER_NAME}
    //   options={statusOptions}
    //   selectedValue={filterValue}
    //   onChange={handleChange}
    // />
    // <div className="filter-row">
    //   {/* <span className="filter-label"></span> */}
    //   <div className="filter-group">
    //     {/*
    //     <FilterTrigger type="select" />
    //     <FilterPresentation type="sheet">
    //     </FilterPresentation>
    //     */}
    //   </div>
    // </div>
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

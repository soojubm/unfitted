import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { useRecoilValue } from 'recoil'
import { useQuery } from '@tanstack/react-query'

import Pagination from 'components/pagination'

import { statusState } from './StatusFilter'
import { typeState } from './TypeFilter'
import { filteredDateState } from './CustomDateChip'

import { formatDate } from 'services/date'
import { fetchItemT } from 'services/api'
import { mockData } from 'services/constants'
import { getQueryString } from 'services/utils'

import Item from './Item'
import SortItem, { sortState } from 'domain/sortings/SortItem'

import styles from './List.module.css'
import Pagehead from 'components/pagehead'

export const getSortingOptions = (value: string) => {
  let option1 = 'TEST1'
  let option2 = false

  if (value === '1' || value === '2') {
    option1 = 'TEST1'
  }

  if (value === '5' || value === '6') {
    option1 = 'TRADE_AMOUNT'
  }

  if (value === '3' || value === '4') {
    option1 = 'AMOUNT'
  }

  if (value === '1') option2 = false
  if (value === '2') option2 = true
  if (value === '3') option2 = false
  if (value === '4') option2 = true
  if (value === '5') option2 = false
  if (value === '6') option2 = true

  return {
    orderColumn: option1,
    orderAsc: option2,
  }
}

function List() {
  const { t } = useTranslation('')

  const typeFilter = useRecoilValue(typeState)
  const statusFilter = useRecoilValue(statusState)
  const sort = useRecoilValue(sortState)
  const filteredDate = useRecoilValue(filteredDateState)

  const [data, setData] = useState(mockData)

  const filterParams = {
    sendReceiveType: typeFilter.toUpperCase(),
    // pageNo: ,
    pageView: 10,
    startDate: formatDate(filteredDate.startDate),
    endDate: formatDate(filteredDate.endDate),
    status: statusFilter.toUpperCase(),
    // currencies: selectedCoin,
  }
  // const params = { ...filterParams, ...getSortingOptions(sort) }
  // const queryFn = () => fetchItemT(`?${getQueryString(params)}`)
  // const { data: itemTData } = useQuery(
  //   ['itemT', params, typeFilter],
  //   queryFn,
  // )

  useEffect(() => {
    // todo: mock data testing
    const filtered = mockData.filter(item => item.type === typeFilter)

    setData(typeFilter === 'all' ? mockData : filtered)
  }, [typeFilter])

  return (
    <section className={styles.container}>
      {/* TODO section head component */}
      {/* <Pagehead title="list title" /> */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // marginTop: '-2rem',
          padding: '1rem 0',
        }}
      >
        <div>
          <h2>list</h2>
          <p role="status" style={{ margin: '.25rem 0 0 0' }}>
            1000개의 결과
          </p>
        </div>
        <SortItem />
      </div>
      <div className={styles.scroll}>
        <header className={styles.head}>
          <div className={styles.row} role="row">
            <div className={styles.column} role="cell" data-cell="cell1">
              1
            </div>
            <div className={styles.column} role="cell" data-cell="cell2">
              2
            </div>
            <div className={styles.column} role="cell" data-cell="cell3">
              3
            </div>
            <div className={styles.column} role="cell" data-cell="cell4">
              4
            </div>
            <div className={styles.column} role="cell" data-cell="cell5">
              5
            </div>
          </div>
        </header>
        <div className={styles.body} role="rowgroup">
          {data.map(item => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
      <Pagination initialPageNumber={0} totalPage={100} />
    </section>
  )
}

export default List

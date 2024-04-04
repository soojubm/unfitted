import Pagination from 'components/pagination'

import SortItem from 'domain/sortings/SortItem'

export const getSortingOptions = (value: string) => {
  let option1 = 'TEST1'
  let option2 = false

  if (value === '1' || value === '2') {
    option1 = 'TEST1'
  }

  if (value === '3' || value === '4') {
    option1 = 'AMOUNT'
  }

  if (value === '1') option2 = false
  if (value === '2') option2 = true
  if (value === '3') option2 = false
  if (value === '4') option2 = true

  return {
    orderColumn: option1,
    orderAsc: option2,
  }
}

function List() {
  return (
    <section>
      <p role="status">1000개의 결과</p>
      <SortItem />
      <Pagination initialPageNumber={0} totalPage={100} />
    </section>
  )
}

export default List

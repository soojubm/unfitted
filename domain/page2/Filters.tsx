import Group from 'components/group'

import CoinFilter from './CoinFilter'
import DateFilter from './DateFilter'
import StatusFilter from './StatusFilter'
import TypeFilter from './TypeFilter'

function Filters() {
  return (
    <Group>
      <CoinFilter />
      <DateFilter />
      <TypeFilter />
      <StatusFilter />
    </Group>
  )
}

export default Filters

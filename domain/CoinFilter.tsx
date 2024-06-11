import { useState } from 'react'

import Chip from 'components/chip'

import { atom } from 'recoil'
import Modal from 'components/modal'
import CoinMenu from './CoinMenu'

const INITIAL_STATE = 'all'
export const coinFilterState = atom({
  key: 'coinFilterState',
  default: INITIAL_STATE,
})

interface CoinFilterProps {}

function CoinFilter(props: CoinFilterProps) {
  // const { data: currencyData } = useQuery(['currencies'], fetchCurrenies)

  const [isOpen, setIsOpen] = useState(false)
  const handleModalClick = () => setIsOpen(prevState => !prevState)

  return (
    <div className="filter-row">
      {/* <span className="filter-label">{t('selectAsset')}</span> */}
      <div style={{ position: 'relative' }}>
        <Chip label="선택" onClick={handleModalClick} isExpandable />
        {/* <ChipGroup
          options={}
          selectedValue={filterValue}
          onClick={handleClick}
        /> */}
      </div>
      {isOpen && (
        <Modal onClick={handleModalClick}>
          <CoinMenu />
        </Modal>
      )}
    </div>
  )
}

export default CoinFilter

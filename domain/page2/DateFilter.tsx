import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { atom, useRecoilState, useRecoilValue } from 'recoil'

import Modal from 'components/modal'

import CustomDateChip, { filteredDateState } from './CustomDateChip'

import { formatDateRange, getStartDate, getYesterdayDate } from 'services/date'
import { DATE_FILTER_NAME } from 'services/constants'

import useFilter from 'domain/filters/useFilter'
import { getFilterLabel } from 'services/utils'

import Chip from 'components/chip'
import MenuItem from 'components/menuitem'
import Dropdown from 'components/dropdown'
import useToggle from 'hooks/useToggle'

const INITIAL_FILTER_STATE = 'yesterday'

export const dateFilterState = atom({
  key: 'dateFilterState',
  default: INITIAL_FILTER_STATE,
})

const TARGET_INITIAL_STATE = false

function DateFilter() {
  const { t } = useTranslation('common')

  const dateFilterOptions: Option[] = [
    {
      name: DATE_FILTER_NAME,
      value: INITIAL_FILTER_STATE,
      label: t('periodYesterday'),
    },
    { name: DATE_FILTER_NAME, value: 'weekly', label: t('period7days') },
    { name: DATE_FILTER_NAME, value: 'monthly', label: t('period30days') },
    { name: DATE_FILTER_NAME, value: 'custom', label: t('periodSelect') },
  ]

  const [filteredDate, setFilteredDate] = useRecoilState(filteredDateState)
  const [dropdown, toggleDropdown] = useToggle(TARGET_INITIAL_STATE)
  const [isOpenModal, setIsOpenModal] = useState(TARGET_INITIAL_STATE)
  const handleModalClick = () => setIsOpenModal(prevState => !prevState)

  const [filterValue, handleFilter] = useFilter(
    INITIAL_FILTER_STATE,
    dateFilterState,
    'click',
  )

  useEffect(() => {
    if (filterValue === 'custom') return

    setFilteredDate({
      startDate: getStartDate(filterValue),
      endDate: getYesterdayDate(),
    })
  }, [filterValue])

  const handleMenuItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLButtonElement
    handleFilter(event)
    toggleDropdown()

    if (value === 'custom') setIsOpenModal(true)
  }

  // todo getFormattedDateRange
  const chipLabel =
    filterValue === 'custom'
      ? formatDateRange(filteredDate.startDate, filteredDate.endDate)
      : getFilterLabel(dateFilterOptions, filterValue)

  // TODO 커스텀 메뉴를 props로 받아서 별도의 함수로 만드는 게 좋을지도 모르겠다.
  // 그렇게 되면 커스텀 액션은 항상 하단에 배치되어야 한다.

  return (
    <>
      <Dropdown
        isOpen={dropdown}
        trigger={
          <Chip label={chipLabel} onClick={toggleDropdown} isExpandable />
        }
        target={dateFilterOptions.map(option => {
          return (
            <MenuItem
              key={option.value}
              option={option}
              onMenuItemClick={handleMenuItemClick}
            />
          )
        })}
      />
      {isOpenModal && (
        <Modal onClick={handleModalClick}>
          <CustomDateChip />
        </Modal>
      )}
    </>
  )
}

export default DateFilter

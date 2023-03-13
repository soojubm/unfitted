import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { atom, useRecoilState, useRecoilValue } from 'recoil'

import Modal from 'components/modal'

import CustomDateChip, { filteredDateState } from './CustomDateChip'
import MultipleFilterField from '../filters/MultipleFilterField'

import { formatDateRange, getStartDate, getYesterdayDate } from 'services/date'
import { DATE_FILTER_NAME } from 'services/constants'

import useFilter from 'domain/filters/useFilter'
import { getFilterLabel } from 'services/utils'

import useOutsideClick from 'hooks/useOutsideClick'

import Chip from 'components/chip'
import MenuItem from 'components/menuitem'
import Dropdown from 'components/dropdown'

const INITIAL_FILTER_STATE = 'yesterday'
export const dateFilterState = atom({
  key: 'dateFilterState',
  default: INITIAL_FILTER_STATE,
})

const TARGET_INITIAL_STATE = false

function DateFilter() {
  const { t } = useTranslation('common')

  const dateFilterOptions: Option[] = [
    { name: DATE_FILTER_NAME, value: INITIAL_FILTER_STATE, label: t('periodYesterday') },
    { name: DATE_FILTER_NAME, value: 'weekly', label: t('period7days') },
    { name: DATE_FILTER_NAME, value: 'monthly', label: t('period30days') },
    { name: DATE_FILTER_NAME, value: 'custom', label: t('periodSelect') },
  ]

  const [filterValue, handleFilter] = useFilter(INITIAL_FILTER_STATE, dateFilterState, 'click')
  const [filteredDate, setFilteredDate] = useRecoilState(filteredDateState)

  const [isOpen, setIsOpen] = useState(TARGET_INITIAL_STATE)
  const handleTriggerClick = () => setIsOpen(prevState => !prevState)

  useEffect(() => {
    if (filterValue === 'custom') return

    setFilteredDate({
      startDate: getStartDate(filterValue),
      endDate: getYesterdayDate(),
    })
  }, [filterValue])

  const [isOpenModal, setIsOpenModal] = useState(TARGET_INITIAL_STATE)
  const handleModalClick = () => setIsOpenModal(prevState => !prevState)

  useEffect(() => {
    if (filterValue !== 'custom') return
    // todo 적용 시점에 따라 달라지는.
    // setFilteredDate({
    //   startDate: startDate
    //   endDate: endDate
    // })
  }, [isOpenModal])

  const handleMenuItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLButtonElement
    handleFilter(event)
    handleTriggerClick()

    if (value === 'custom') setIsOpenModal(true)
  }

  // setIsOpen과 의존성 분리가 필요.
  // global 상태로 배열로 관리하면?
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => setIsOpen(TARGET_INITIAL_STATE))

  // todo getFormattedDateRange
  const chipLabel =
    filterValue === 'custom'
      ? formatDateRange(filteredDate.startDate, filteredDate.endDate)
      : getFilterLabel(dateFilterOptions, filterValue)

  // TODO 커스텀 메뉴를 props로 받아서 별도의 함수로 만드는 게 좋을지도 모르겠다. 그렇게 되면 커스텀 액션은 항상 하단에 배치되어야 한다.

  return (
    <>
      <div ref={ref}>
        <Dropdown
          isOpen={isOpen}
          trigger={<Chip label={chipLabel} onClick={handleTriggerClick} isExpandable />}
          target={dateFilterOptions.map(option => {
            return (
              <MenuItem key={option.value} option={option} onMenuItemClick={handleMenuItemClick} />
            )
          })}
        />
      </div>
      {/* <MultipleFilterField
        options={dateFilterOptions}
        initialState={INITIAL_FILTER_STATE}
        state={dateFilterState}
      /> */}
      {isOpenModal && (
        <Modal onClick={handleModalClick}>
          <CustomDateChip />
        </Modal>
      )}
    </>
  )
}

export default DateFilter

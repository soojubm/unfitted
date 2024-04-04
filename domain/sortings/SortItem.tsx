import { atom } from 'recoil'
import { useTranslation } from 'next-i18next'

import MultipleFilterField from 'domain/filters/MultipleFilterField'

const sortingOptions = [
  { value: '1', label: '최신순' },
  { value: '2', label: '오래된순' },
  { value: '5', label: '가격높은순' },
  { value: '6', label: '가격낮은순' },
]

export const sortState = atom({
  key: 'sortState',
  default: sortingOptions[0].value,
})

function SortItem() {
  const { t } = useTranslation('')

  return (
    <>
      <MultipleFilterField
        options={sortingOptions}
        initialState={sortingOptions[0].value}
        state={sortState}
      />
    </>
  )
}

export default SortItem

// const i18nSample = [
//   { name: 'sorting', value: '1', label: t('sorting1') },
//   { name: 'sorting', value: '2', label: t('sorting1') },
//   { name: 'sorting', value: '5', label: t('sorting1') },
//   { name: 'sorting', value: '6', label: t('sorting1') },
// ]

import { atom } from 'recoil'
import { useTranslation } from 'next-i18next'

import MultipleFilterField from 'domain/filters/MultipleFilterField'

const INITIAL_STATE = '1'
export const sortState = atom({
  key: 'sortState',
  default: INITIAL_STATE,
})

const sortingOptions = [
  { name: 'sorting', value: INITIAL_STATE, label: '최신순' },
  { name: 'sorting', value: '2', label: '오래된순' },
  { name: 'sorting', value: '5', label: '가격높은순' },
  { name: 'sorting', value: '6', label: '가격낮은순' },
]

function SortItem() {
  const { t } = useTranslation('')

  return (
    <MultipleFilterField
      options={sortingOptions}
      initialState={INITIAL_STATE}
      state={sortState}
      // type="sort"
    />
    //   <button
    //     onClick={handlePresentation}
    //     style={{ display: 'inline-flex', alignItems: 'center', height: '32px' }}
    //   >
    //     정렬: {filterValue || sortingOptions[0].label}
    //     <span className="indicator">
    //       <Image src="/arrow_down.svg" alt="indicator" width="18" height="18" />
    //     </span>
    //   </button>
    // </div>
  )
}

export default SortItem

// const i18nSample = [
//   { name: 'sorting', value: '1', label: t('sorting1') },
//   { name: 'sorting', value: '2', label: t('sorting1') },
//   { name: 'sorting', value: '5', label: t('sorting1') },
//   { name: 'sorting', value: '6', label: t('sorting1') },
// ]

import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { atom, useRecoilState } from 'recoil'

import styles from './Pagination.module.css'

interface PaginationProps {
  // setOffset: Dispatch<SetStateAction<number>>
  initialPageNumber: number
  totalPage: number
  // totalCount: number // 페이지네이션에 필요가 없다. 서버에서 받아서 사용자에게 보여줌.
}

// offset을 서버에서 0으로 줄 수도 있고 1로 줄 수도 있다.
const PAGE_INITIAL_OFFSET = 0
const PAGE_SIZE = 5
const countPerPage = 20

const initialPageNumber = 0
export const currentPageState = atom({
  key: 'currentPageState',
  default: initialPageNumber,
})

function Pagination(props: PaginationProps) {
  const { t } = useTranslation('')

  const [pages, setPages] = useState<(number | string)[]>([])
  const [selected, setSelected] = useRecoilState(currentPageState)

  // const pageCount = Math.ceil(props.totalCount / countPerPage)

  const limit = props.totalPage

  const isFirstPage = selected === props.initialPageNumber
  const isLastPage = selected >= limit - 1

  const handlePrevClick = () => setSelected(prevOffset => Math.max(prevOffset - 1, 0))
  const handleNextClick = () => setSelected(prevOffset => prevOffset + 1)

  useEffect(() => {
    let tempPages: (number | '...')[] = []

    // TODO: PAGE_SIZE
    const PAGE_STANDARD = 3

    const isUnderFour = selected >= 0 && selected < PAGE_STANDARD
    const isFour = selected === PAGE_STANDARD
    const isOverFour = selected > PAGE_STANDARD

    if (isUnderFour) {
      tempPages = [1, 2, 3, 4, '...', limit]
    } else if (isFour) {
      tempPages = [1, '...', 3, 4, 5, '...', limit]
    } else if (isOverFour && selected <= limit - 4) {
      tempPages = [1, '...', selected, selected + 1, selected + 2, '...', limit]
    } else if (selected > limit - 4) {
      tempPages = [1, '...', limit - 3, limit - 2, limit - 1, limit]
    }

    setPages(tempPages)
  }, [limit, selected])

  return (
    <nav className={styles.pagination} aria-label="pagination">
      <button
        className={styles['pagination-previous']}
        aria-label="앞 페이지로 이동"
        onClick={handlePrevClick}
        disabled={isFirstPage}
      >
        {t('paginationPrev')}
      </button>
      {pages.map((page, index) => {
        // todo
        const handlePageLinkClick = () => {
          if (typeof page === 'string') return
          setSelected(page - 1)
        }
        const isCurrentPage = typeof page === 'number' ? page - 1 === selected : false

        if (page === '...') {
          return (
            <span key={index} className={styles['pagination-ellipsis']}>
              {page}
            </span>
          )
        }

        return (
          <button
            key={index}
            className={styles['pagination-link']}
            aria-current={isCurrentPage ? 'true' : 'false'}
            onClick={handlePageLinkClick}
          >
            {page}
          </button>
        )
      })}
      <button
        className={styles['pagination-next']}
        aria-label="뒷 페이지로 이동"
        onClick={handleNextClick}
        disabled={isLastPage}
      >
        {t('paginationNext')}
      </button>
    </nav>
  )
}

export default Pagination

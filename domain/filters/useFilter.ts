import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useRouter } from 'next/router'

// todo type
function useFilter(initialState: string, state: any, eventType: 'change' | 'click'): any {
  const [filterValue, setFilterValue] = useRecoilState(state)

  const router = useRouter()

  useEffect(() => {
    const initializeFilter = () => setFilterValue(initialState)
    initializeFilter()
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget
    setFilterValue(value)

    // TODO next에서 페이지를 다시 그린다.
    // router.push({ query: { ...router.query, [name]: value } }, undefined, { shallow: true })
    window.history.replaceState(
      window.history.state,
      '',
      window.location.pathname + '?' + `${[name]}=${value}`,
    )
  }

  // todo 역할을 명확히 구분하면, 두 가지 이벤트 핸들러를 쓸 필요가 없다. useSort를 추가하기.
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget as HTMLSelectElement
    setFilterValue(value)
  }

  const eventHandler = eventType === 'click' ? handleClick : handleChange

  return [filterValue, eventHandler]
}

export default useFilter

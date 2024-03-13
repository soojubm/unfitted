import { useCallback, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// defaultValue?: boolean,
type test = [boolean, () => void, Dispatch<SetStateAction<boolean>>]

export function useToggle(defaultValue = false): test {
  const [value, setValue] = useState(!!defaultValue)

  const toggle = useCallback(() => {
    setValue(x => !x)
  }, [])

  return [value, toggle, setValue]
}
export default useToggle

// const [accordions, setAccordions] = useState<string[]>([])
// const handleAccordionClick = useCallback(
//   (event: React.MouseEvent<HTMLButtonElement>) => {
//     const { name } = event.currentTarget as HTMLButtonElement

//     if (accordions.includes(name)) {
//       setAccordions(accordions.filter((accordion: string) => accordion !== name))
//     } else {
//       setAccordions(prevStates => [...prevStates, name])
//     }
//   },
//   [accordions],
// )

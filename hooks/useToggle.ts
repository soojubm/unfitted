import { useCallback, useState } from 'react'

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState)

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState(state => !state), [])

  return [state, toggle]
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

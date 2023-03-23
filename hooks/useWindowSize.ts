import { useState, useEffect } from 'react'

const INITIAL_VALUE = {
  width: 0,
  height: 0,
}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState(INITIAL_VALUE)

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize

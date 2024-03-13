import { useState, useEffect, useRef } from 'react'

function useScrollDirection() {
  const scrollPos = useRef(0)
  const [direction, setDirection] = useState({
    isDown: false,
    isUp: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      setDirection({
        isDown: window.pageYOffset > scrollPos.current,
        isUp: window.pageYOffset < scrollPos.current,
      })
      scrollPos.current = window.pageYOffset
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}

export default useScrollDirection

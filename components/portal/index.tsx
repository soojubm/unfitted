import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  selector: string
}

function Portal({ children, selector }: PortalProps) {
  const [element, setElement] = useState<HTMLElement | null>()

  useEffect(() => {
    setElement(document.getElementById(selector))
  }, [selector])

  if (!element) return null
  return ReactDOM.createPortal(children, element)
}

export default Portal

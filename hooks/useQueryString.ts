// import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function useQueryString() {
  const router = useRouter()

  const [test, setTest] = useState('')
  useEffect(() => {}, [])
  return []
}

export default useQueryString

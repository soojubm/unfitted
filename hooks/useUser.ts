// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'

import { atom, useRecoilState } from 'recoil'
import { useLocalStorage } from './useLocalStorage'

export interface User {
  // id: string
  // name: string
  // email: string
  // accessToken?: string
}

export const useUser = () => {
  // const [user, setUser] = useRecoilState(userState)
  // const { setItem } = useLocalStorage()
  // const addUser = (user: any) => {
  //   setUser(user)
  //   setItem('user', JSON.stringify(user))
  // }
  // const removeUser = () => {
  //   setUser(null)
  //   setItem('user', '')
  // }
  // return { user, addUser, removeUser }
}

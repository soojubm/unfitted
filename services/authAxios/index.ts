// function isExpiredToken(tokenType: typeof ACCESS_TOKEN | typeof REFRESH_TOKEN) {
//   const isAccessToken = tokenType === ACCESS_TOKEN
//   const token = localStorage.getItem(isAccessToken ? ACCESS_TOKEN : REFRESH_TOKEN) || ''
//   const exp = localStorage.getItem('expiredDate')
//   const isExpired = new Date(exp * 1000) < new Date()
//   return isExpired
// }

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'services/constants'

import jwt_decode from 'jwt-decode'

import { ROUTES } from 'services/routes'
import { logout } from 'services/auth'

const tokenUri = '/'

let accessToken
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem(ACCESS_TOKEN) || ''
}
export const authAxios: AxiosInstance = axios.create({})

export const userAxios: AxiosInstance = axios.create({
  // baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

authAxios.interceptors.request.use(verifyToken, async function (error) {
  const { config, response } = error
  const { status } = response

  // react query
  if (status >= 400) {
    let originalRequest = config
    alert('로그인이 만료되었습니다.')
    localStorage.clear()
    window.location.replace(ROUTES.LOGIN)
    return authAxios(originalRequest)
  }
  // originalRequest.headers.authorization = `Bearer ${access_token}`
  return Promise.reject(error)
})

authAxios.interceptors.response.use(
  function (response) {
    // console.log('interceptor response success')
    // 2xx 범위
    return response
  },
  async function (error) {
    // 2xx 외의 범위
    // const {
    //   config,
    //   response: { status },
    // } = error
    // if (status === 401) {
    //   let originalRequest = config
    //   originalRequest.headers.authorization = `Bearer ${access_token}`
    //   return axios(originalRequest)
    // }

    console.log('intercepter response error')
    return Promise.reject(error)
  },
)

// authAxios.interceptors.response.use(checkToken)

async function verifyToken(config: AxiosRequestConfig) {
  const origin = config

  let accessToken = localStorage.getItem(ACCESS_TOKEN) || ''
  let refreshToken = localStorage.getItem(REFRESH_TOKEN) || ''

  // if (!accessToken || !refreshToken) return

  const decodedAccessToken: any = jwt_decode(accessToken)
  const decodedRefreshToken: any = jwt_decode(refreshToken)
  const nowDate = new Date().getTime() / 1000
  const isExpiredAccessToken = decodedAccessToken.exp < nowDate
  const isExpiredRefreshToken = decodedRefreshToken.exp < nowDate

  // console.log('isExpiredAccessToken', isExpiredAccessToken)
  // console.log('isExpiredRefreshToken', isExpiredRefreshToken)

  if (isExpiredRefreshToken) {
    logout()
    window.location.replace(ROUTES.LOGIN)
    // return config
  }

  if (isExpiredAccessToken) {
    let refreshToken = localStorage.getItem(REFRESH_TOKEN) || ''
    const params = {
      client_id: '',
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }
    const response = await userAxios.post(tokenUri, params)
    const { access_token, refresh_token } = response.data

    // console.log('expired res', response.data)

    localStorage.setItem(ACCESS_TOKEN, access_token)
    localStorage.setItem(REFRESH_TOKEN, refresh_token)

    origin.headers = {
      Authorization: `Bearer ${access_token}`,
    }

    return origin
  } else {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    }
    return config
  }
}

// if (accessToken) originalRequest.headers = { Authorization: `Bearer ${accessToken}` }
// authAxios.interceptors.request.use(
//   async function (config) {
//     // const originalRequest = config

//     if (isExpiredToken(ACCESS_TOKEN)) {
//       const response = await getRefreshToken()
//       const { access_token, refresh_token } = response.data
//       localStorage.setItem(ACCESS_TOKEN, access_token)
//       localStorage.setItem(REFRESH_TOKEN, refresh_token)
//     }

//     if (isExpiredToken(REFRESH_TOKEN)) {
//       // localStorage.setItem()
//     }
//     // 실패했던 요청을 다시 수행한다.
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   },
// )

// authAxios.interceptors.response.use(
//   function (response) {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     return response
//   },
//   async function (error) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // const {
//     //   config,
//     //   response: { status },
//     // } = error
//     // if (status === 401) {
//     //   let originalRequest = config
//     //   originalRequest.headers.authorization = `Bearer ${access_token}`
//     //   return axios(originalRequest)
//     // }
//     return Promise.reject(error)
//   },
// )

import { REFRESH_TOKEN } from 'services/constants'
import jwt_decode from 'jwt-decode'

export const getSearchParams = (params: any) =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })
    .join('&')

export const getQueryString = (payload: any) => {
  return Object.entries(payload)
    .map(e => e.join('='))
    .join('&')
}

export const getPercentage = (targetValue: number, totalValue: number) => {
  const value = Math.round((targetValue / totalValue) * 100)

  return isNaN(value) ? 0 : value
}

export const isExpiredRefreshToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN) || ''
  if (refreshToken.length == 0) return true
  const decodedRefreshToken: any = jwt_decode(refreshToken)
  return decodedRefreshToken.exp < new Date().getTime() / 1000
}

export function getFilterLabel(options: Option[], value: string) {
  return options.find(option => option.value === value)?.label
}

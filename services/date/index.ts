import dayjs from 'dayjs'

import { DATE_FORMAT } from 'services/constants'

export const formatDate = (date: any) => dayjs(date).format(DATE_FORMAT)

export const formatDateRange = (startDate: any, endDate: any) =>
  `${formatDate(startDate)} - ${formatDate(endDate)}`

export function getYesterdayDate() {
  return new Date(new Date().setDate(new Date().getDate() - 1))
}

export function getStartDate(dateOption: string) {
  const now = new Date()

  if (dateOption === 'yesterday') return new Date(now.setDate(now.getDate() - 1))
  if (dateOption === 'weekly') return new Date(now.setDate(now.getDate() - 7))
  if (dateOption === 'monthly') return new Date(now.setDate(now.getDate() - 30))

  return getYesterdayDate()
}

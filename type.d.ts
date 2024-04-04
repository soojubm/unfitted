type Option = {
  value: string
  label: string
}

type Status = '' | '' | ''

interface Item1 {
  name: string
  entityId?: string
  src: string
  status: string
  date: string
  value: string
  width: number | undefined
  height: number | undefined
  publicKey: string
}

// type Alliance = Square | VerifyType
// type Extened = Item & {
//   test?: boolean
// }

interface Item {
  id: string
  createDatetime: string
  name: string
  status: Status

  amount: number
  tradeAmount: number

  type: 'type1' | 'type2'
}

type FormValues = {
  keyword: string
}

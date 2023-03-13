import { authAxios } from 'services/authAxios'

// type Todos = ReadonlyArray<Todo>
// axios.defaults.withCredentials = true

// todo fetch 안에서 try catch가 있어서 return type문제.
export async function fetchItemT(params: any) {
  try {
    const url = `/itemT${params}`
    const response = await authAxios.get(url)

    return response.data.data
  } catch (error) {
    console.log('itemT api error', error)
  }
}

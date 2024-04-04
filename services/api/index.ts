import { authAxios } from 'services/authAxios'

// type Todos = ReadonlyArray<Todo>
// axios.defaults.withCredentials = true

export async function fetchItemT(params: any) {
  try {
    const url = `/itemT${params}`
    const response = await authAxios.get(url)

    return response.data.data
  } catch (error) {
    console.log('itemT api error', error)
  }
}

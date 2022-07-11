import axios from 'axios'
import { getAxios } from '../main'

axios.defaults.baseURL = getAxios

export async function checkValidation (token) {
  const params = new URLSearchParams()
  params.append('authToken', token)
  const { data: res } = await axios.post('user/isStillValid', params)
  console.log(res.obj)
  if (res.obj === '1') {
    return true
  } else {
    return false
  }
}

import axios from 'axios'

export const getRequest = async (url,headers) => {
  const config = {
      headers: {
      'x-api-key': headers['x-api-key']
      }
  }
  const result = await axios.get(url,config)
  console.log('result.data: ', result.data)
  return result.data
}
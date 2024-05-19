import axios, {AxiosRequestConfig} from 'axios'
import authHeader from './auth-header'
import {DefaultServiceInterface} from './interface/DefaultServiceInterface'

export const defaultService = {
  handleService
}

function handleService(params: DefaultServiceInterface) {

  const apiUrl = process.env.REACT_APP_API_URL
  const headers = params.headers ? params.headers : null

  /****************
   헤더 예제

   defaultService.handleService({
    metwhod: 'get',
    endPoint: `https://api.github.com/repos/nervLv32/admin_react`,
    headers: {
      authorization: `token ${token}`
    }
  })
   ****************/

  const axiosConfig: AxiosRequestConfig = {
    method: params.method,
    url: (params.standAlone ? '' : apiUrl) + params.endPoint,
    headers,
  }

  if (params.method === 'get' || params.method === 'delete') {
    axiosConfig.params = params.params
  }

  if (params.method === 'post' || params.method === 'patch' || params.method === 'put') {
    axiosConfig.data = params.params
  }

  if (params.headers) {
    axiosConfig.headers = params.headers
  }

  if (params.responseType) {
    axiosConfig.responseType = params.responseType
  }

  return axios(axiosConfig)
}

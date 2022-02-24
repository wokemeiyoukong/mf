import request from '../utils/request'

interface IInfoParams {
  username: string
  password: string
}

export interface IInfoResponse {
  name: string
  age: number
}

export function fetchInformation(params: IInfoParams) {
  return request<IInfoResponse[]>({
    url: '/api/user/info',
    method: 'GET',
    params
  })
}

export function fetchError() {
  return request({
    url: '/api/user/error',
    method: 'GET'
  })
}

import axios from 'axios'

import type { AxiosRequestConfig } from 'axios'

export interface IRequestConfig extends AxiosRequestConfig {
  loading?: boolean
  isNoCancel?: boolean
}

// export interface IResponseConfig extends AxiosResponse {
//   token?: string
// }

// 重复请求存储 map
const cacheFetchMap = new Map()

function getCacheKey(config: IRequestConfig) {
  const { url, params, method } = config
  let { data } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

function setCache(config: IRequestConfig) {
  const cacheKey = getCacheKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!cacheFetchMap.has(cacheKey)) {
        cacheFetchMap.set(cacheKey, cancel)
      }
    })
}

function removeReuseFetch(config: IRequestConfig) {
  const cacheKey = getCacheKey(config)
  if (cacheFetchMap.has(cacheKey)) {
    const cancelToken = cacheFetchMap.get(cacheKey)
    cancelToken(cacheKey)
    cacheFetchMap.delete(cacheKey)
  }
}

const { VITE_BASE_URL } = import.meta.env

console.log(VITE_BASE_URL, '===')

const instance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config: IRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}` // 自定义token
    }
    // 请求拦截时 判断是否有重复请求
    removeReuseFetch(config)
    // 添加是否需要取消的来判断是否设置 取消回调
    !config.isNoCancel && setCache(config)

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.headers.Authorization) {
      localStorage.setItem('token', response.headers.Authorization)
    }
    // 完成后清空缓存的key
    removeReuseFetch(response.config)
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

// 接口响应通过格式
export interface IHttpResponse<T> {
  code: number
  message: string
  data: T | null
  [key: string]: unknown
}

// 未处理错误情况
// const request = async <T = any>(config: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
//   const { data } = await instance.request<IHttpResponse<T>>(config)
//   return data
// }

const request = async <T = unknown>(config: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
  try {
    const response = await instance(config)
    const data: IHttpResponse<T> = response.data
    data.code === 1 ? console.log('success') : console.error('error')
    return data
  } catch (error) {
    const message = (error as unknown as Error).message || '请求错误'
    return {
      code: -1,
      message,
      data: null
    }
  }
}

export default request

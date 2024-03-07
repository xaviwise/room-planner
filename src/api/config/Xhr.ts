import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios'

export default class Xhr {
  private axios: AxiosInstance

  private constructor (axios: AxiosInstance) {
    this.axios = axios
  }

  get<R> (url: string, opts?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axios.get(url, opts)
  }

  post<D, R> (url: string, data: D, opts?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axios.post(url, data, opts)
  }

  put<D, R> (url: string, data: D, opts?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axios.put(url, data, opts)
  }

  patch<D, R> (url: string, data: D, opts?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axios.patch(url, data, opts)
  }

  delete<R> (url: string, opts?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.axios.delete(url, opts)
  }

  getAxios (): AxiosInstance {
    return this.axios
  }

  static builder () {
    return new this.Builder()
  }

  private static Builder = class XhrBuilder {
    private xhrConfig: any = {};

    build (): Xhr {
      const axiosInstance = axios.create(this.xhrConfig)
      return new Xhr(axiosInstance)
    }

    setBaseUrl (baseURL: string) {
      this.xhrConfig.baseURL = baseURL
      return this
    }

    setHeaders (headers: object) {
      this.xhrConfig.headers = headers
      return this
    }

    setTimeout (time: number) {
      this.xhrConfig.timeout = time
      return this
    }
  }
}

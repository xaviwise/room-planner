import { xhr } from '@/api/config/Repository'
import { type AxiosResponse } from 'axios'
import FloorsRequestDTO from '../dto/FloorsRequestDTO'
import FloorsResponseDTO from '../dto/FloorsResponseDTO'
import RoomRequestDTO from '../dto/RoomRequestDTO'
import RoomResponseDTO from '../dto/RoomResponseDTO'
import type FloorsRepository from '../FloorsRepository'

export default class FloorsRepositoryImpl implements FloorsRepository {
  getDefaultHeaders (): any {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }

  getFloors (request: FloorsRequestDTO): Promise<AxiosResponse<FloorsResponseDTO>> {
    const microserviceUrl = import.meta.env.VITE_APP_ROOT_API
    const endpoint = '/floors'
    const headers = this.getDefaultHeaders()
    return xhr.get(microserviceUrl.concat(endpoint), { headers })
  }

  addRoom (request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>> {
    const microserviceUrl = import.meta.env.VITE_APP_ROOT_API
    const endpoint = '/addRoom'
    const headers = this.getDefaultHeaders()
    return xhr.post(microserviceUrl.concat(endpoint), request , { headers })
  }

  deleteRoom (request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>> {
    const microserviceUrl = import.meta.env.VITE_APP_ROOT_API
    const endpoint = '/deleteRoom'
    const headers = this.getDefaultHeaders()
    return xhr.post(microserviceUrl.concat(endpoint), request , { headers })
  }

  updateRoom (request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>> {
    const microserviceUrl = import.meta.env.VITE_APP_ROOT_API
    const endpoint = '/updateRoom'
    const headers = this.getDefaultHeaders()
    return xhr.post(microserviceUrl.concat(endpoint), request, { headers })
  }

}

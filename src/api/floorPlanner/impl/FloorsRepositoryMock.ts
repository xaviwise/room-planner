import { type AxiosResponse } from 'axios'
import type FloorsRepository from '../FloorsRepository'
import FloorsJSON from '../mock/floors.json'
import RoomJSON from '../mock/room.json'
import FloorsRequestDTO from '../dto/FloorsRequestDTO'
import FloorsResponseDTO from '../dto/FloorsResponseDTO'
import RoomRequestDTO from '../dto/RoomRequestDTO'
import RoomResponseDTO from '../dto/RoomResponseDTO'

export const axiosResponse200 = (data: any): Promise<AxiosResponse<any>> => {
  const response = {
    status: 200,
    data,
    statusText: '200',
    headers: {},
    config: {}
  }
  return Promise.resolve(response)
}

export default class FloorsRepositoryMock implements FloorsRepository {
  getFloors (request: FloorsRequestDTO): Promise<AxiosResponse<FloorsResponseDTO>> {
    const response: FloorsResponseDTO = FloorsJSON
    return axiosResponse200(response)
  }

  addRoom (request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>> {
    const response: RoomResponseDTO = RoomJSON
    return axiosResponse200(response)
  }

  deleteRoom (request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>> {
    const response: RoomResponseDTO = RoomJSON
    return axiosResponse200(response)
  }

  updateRoom (request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>> {
    const response: RoomResponseDTO = RoomJSON
    return axiosResponse200(response)
  }
}
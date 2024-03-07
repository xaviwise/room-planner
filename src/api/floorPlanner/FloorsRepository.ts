import { type AxiosResponse } from 'axios'
import FloorsRequestDTO from './dto/FloorsRequestDTO'
import FloorsResponseDTO from './dto/FloorsResponseDTO'
import RoomRequestDTO from './dto/RoomRequestDTO'
import RoomResponseDTO from './dto/RoomResponseDTO'

export default interface FloorsRepository {
  getFloors(request: FloorsRequestDTO): Promise<AxiosResponse<FloorsResponseDTO>>;
  addRoom(request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>>;
  deleteRoom(request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>>;
  updateRoom(request: RoomRequestDTO): Promise<AxiosResponse<RoomResponseDTO>>;
}

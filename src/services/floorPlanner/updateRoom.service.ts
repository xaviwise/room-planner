import API from '@/api'
import RoomRequest from './models/RoomRequest'
import RoomResponse from './models/RoomResponse'

const executeAction = async (request: RoomRequest): Promise<RoomResponse> => {
  try {
    const response = await API.FloorsRepository.updateRoom(request)
    return new RoomResponse(response.data)
  } catch (err) {
    console.error('[updateRoom] - Ha ocurrido un error al llamar updateRoom service')
    throw err
  }
}

export default executeAction

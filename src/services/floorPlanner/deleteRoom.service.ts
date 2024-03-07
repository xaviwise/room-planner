import API from '@/api'
import RoomRequest from './models/RoomRequest'
import RoomResponse from './models/RoomResponse'

const executeAction = async (request: RoomRequest): Promise<RoomResponse> => {
  try {
    const response = await API.FloorsRepository.deleteRoom(request)
    return new RoomResponse(response.data)
  } catch (err) {
    console.error('[deleteRoom] - Ha ocurrido un error al llamar deleteRoom service')
    throw err
  }
}

export default executeAction

import API from '@/api'
import RoomRequest from './models/RoomRequest'
import RoomResponse from './models/RoomResponse'

const executeAction = async (request: RoomRequest): Promise<RoomResponse> => {
  try {
    const response = await API.FloorsRepository.addRoom(request)
    return new RoomResponse(response.data)
  } catch (err) {
    console.error('[addRoom] - Ha ocurrido un error al llamar addRoom service')
    throw err
  }
}

export default executeAction

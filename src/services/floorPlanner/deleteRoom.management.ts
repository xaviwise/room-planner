import deleteRoom from '@/services/floorPlanner/deleteRoom.service'
import RoomRequest from './models/RoomRequest'

const executeAction = async (request: RoomRequest) => {
  try {
    const response = await deleteRoom(request)
    if (response) {
      return response
    }
    return null
  } catch (err) {
    console.error('[deleteRoom] - Ha ocurrido un error al llamar a deleteRoom management')
    throw err
  }
}

export default executeAction
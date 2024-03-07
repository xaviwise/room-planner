import updateRoom from '@/services/floorPlanner/updateRoom.service'
import RoomRequest from './models/RoomRequest'

const executeAction = async (request: RoomRequest) => {
  try {
    const response = await updateRoom(request)
    if (response) {
      return response
    }
    return null
  } catch (err) {
    console.error('[updateRoom] - Ha ocurrido un error al llamar a updateRoom management')
    throw err
  }
}

export default executeAction
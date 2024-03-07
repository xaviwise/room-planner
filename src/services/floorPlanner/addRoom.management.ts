import addRoom from '@/services/floorPlanner/addRoom.service'
import RoomRequest from './models/RoomRequest'

const executeAction = async (request: RoomRequest) => {
  try {
    const response = await addRoom(request)
    if (response) {
      return response
    }
    return null
  } catch (err) {
    console.error('[addRoom] - Ha ocurrido un error al llamar a addRoom management')
    throw err
  }
}

export default executeAction
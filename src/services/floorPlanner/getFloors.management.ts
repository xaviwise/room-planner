import getFloors from '@/services/floorPlanner/getFloors.service'
import FloorsRequest from './models/FloorsRequest'

const executeAction = async (request: FloorsRequest) => {
  try {
    const response = await getFloors(request)
    if (response) {
      return response
    }
    return null
  } catch (err) {
    console.error('[getFloors] - Ha ocurrido un error al llamar a getFloors management')
    throw err
  }
}

export default executeAction
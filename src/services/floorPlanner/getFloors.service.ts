import API from '@/api'
import FloorsRequest from './models/FloorsRequest'
import FloorsResponse from './models/FloorsResponse'

const executeAction = async (request: FloorsRequest): Promise<FloorsResponse> => {
  try {
    const response = await API.FloorsRepository.getFloors(request)
    return new FloorsResponse(response.data)
  } catch (err) {
    console.error('[getFloors] - Ha ocurrido un error al llamar getFloors service')
    throw err
  }
}

export default executeAction

import FloorsRepositoryImpl from './impl/FloorsRepositoryImpl'
import FloorsRepositoryMock from './impl/FloorsRepositoryMock'

export default {
  getInstance () {
    if (import.meta.env.VITE_MOCK_FLOORS_ENDPOINT === 'false') {
      return new FloorsRepositoryImpl()
    }
    return new FloorsRepositoryMock()
  }
}
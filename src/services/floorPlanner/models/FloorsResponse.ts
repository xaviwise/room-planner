import type IFloorDTO from '@/api/common/IFloorDTO'

export default class FloorsResponse {
  name?: string;
  floors?: Array<IFloorDTO>;

  constructor (params: any) {
    this.name = params.name
    if (params && params.length > 0) {
      this.floors = Array.from(params)
    } else {
      this.floors = []
    }
  }
}

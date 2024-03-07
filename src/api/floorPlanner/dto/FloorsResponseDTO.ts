import type IFloorDTO from '@/api/common/IFloorDTO'

export default class FloorsResponseDTO {
  name?: string;
  floors?: Array<IFloorDTO>;
}

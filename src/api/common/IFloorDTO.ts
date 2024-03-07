import type IRoomDTO from './IRoomDTO'

export default interface IFloorDTO {
  name: string;
  rooms: Array<IRoomDTO>;
}

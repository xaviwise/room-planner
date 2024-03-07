export default class RoomResponse {
  result?: boolean;
  
  constructor (params: any) {
    this.result = params.result
  }
}

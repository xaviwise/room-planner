import { defineStore } from "pinia"
import type IFloorDTO from "@/api/common/IFloorDTO"

export interface IFloorState {
  allFloors: Array<IFloorDTO>;
}

export default defineStore("floor-store", {
  state: (): IFloorState => ({ 
    allFloors: []
  }),
  actions: {
    saveFloors (floorsData: Array<IFloorDTO>) {
      this.allFloors = floorsData
    }
  },
  getters: {
    getAllFloors (state) {
      return state.allFloors
    }
  }
})

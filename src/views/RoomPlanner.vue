<template>
  <div v-if="hasCurFloor" class="container">
    <div class="container-header">
      Salas 
      <span>
        <v-switch 
          v-model="showStats"
          class="header-stats-switch custom-switch"
          label="Estadísticas"
        />
      </span>
    </div>
    <div class="container-floor-selector">
      <v-combobox
        v-model="floor"
        :items="getFloorNames"
        density="compact"
        variant="solo-inverted"
        @update:model-value="floorChanged"
      />
    </div>
    <hr class="divider" />
    <div  class="room-planner">
      <div class="floor-header">
        <div class="floor-name">
          {{ getCurrFloorName }}
        </div>
        <v-btn class="text-none text-subtitle-1 custom-button" @click="onAddRoom">
          Alta Sala
        </v-btn>
      </div>
      <div class="floor-data">
        <div class="room-grid">
          <template v-for="(rec, index) in getCurrRooms" :key="index">  
            <room
              v-bind="rec"
              v-if="roomIsVisible(rec)"
              @modifiedRoom="onModifiedRoom"
              @deletedRoom="onDeletedRoom"
            />
          </template>  
        </div>
        <div v-if="showStats" class="floor-data-controls">
          <div class="room-chart">
            <Doughnut :data="getFloorStats" :options="options" />
          </div>
          <div class="floor-room-visibility">
            <v-slider
              v-model="capacity"
              class="custom-slider"
              thumb-label="always"
              :max="maxCapacity"
              :min="minCapacity"
              label="Capacidad"
            />
            <v-slider
              v-model="occupation"
              class="custom-slider"
              thumb-label="always"
              :max="maxOccupation"
              :min="minOccupation"
              label="Ocupación%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'  
import room from '@/components/room/Room.vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import useModalStore from "@/stores/useModalStore"
import useFloorStore from "@/stores/useFloorStore"
import type IRoomDTO from '@/api/common/IRoomDTO'
import type IFloorDTO from '@/api/common/IFloorDTO'
import { mapState, mapStores, mapActions } from 'pinia'
import getFloors from '@/services/floorPlanner/getFloors.management'
import InfoDialog from "@/components/modal/InfoDialog.vue"
import AddRoomDialog from "@/components/modal/AddRoomDialog.vue"
ChartJS.register(ArcElement, Tooltip, Legend)
</script>

<script lang="ts">
export default {
  data () {
    return {
      showStats: false,
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      capacity: 0,
      minCapacity: 0,
      maxCapacity: 0,
      occupation: 0,
      minOccupation: 0,
      maxOccupation: 100,
      floor: '',
      currFloor: {} as IFloorDTO
    }
  },
  computed: {
    ...mapStores(useModalStore, useFloorStore),
    ...mapState(useFloorStore, ['getAllFloors']),
    hasCurFloor () {
      return this.currFloor !== null
    },
    getCurrFloorName () {
      if (this.currFloor !== null) return this.currFloor.name
      return ''
    },
    getFloorNames () {
      const floors_array: any[] = []
      this.getAllFloors.forEach((floor: IFloorDTO) => {
        floors_array.push(floor.name)
      })
      return floors_array
    },
    getCurrRooms () {
      if (this.currFloor !== null) return this.currFloor.rooms
      return []
    },
    getFloorStats () {
      let ocupadas_total = 0
      let max_capacity_total = 0
      if (this.currFloor !== null) {
        this.currFloor.rooms.forEach((room: IRoomDTO) => {
          ocupadas_total += Math.round(room.occupation * room.max_capacity / 100)
          max_capacity_total += room.max_capacity
        })
        return {
          labels: ['Ocupadas', 'Disponibles'],
          datasets: [{
            backgroundColor: ['#E46651', '#41B883'],
            data: [ocupadas_total, max_capacity_total - ocupadas_total]
          }]
        }
      }
      return {
        labels: [],
        datasets: []
      }
    }
  },
  mounted () {
    this.getFloorData()
  },
  methods: {
    ...mapActions(useModalStore, ['openModal','closeModal']),
    ...mapActions(useFloorStore, ['saveFloors']),
    async getFloorData () {
      // mascara
      let response = null
      try {
        const params = {
          location: 'aviles'
        }
        response = await getFloors(params)
        if (!response || !response.floors) return
        this.saveFloors(response.floors)
        this.currFloor = response.floors[0]
        this.floor = response.floors[0].name
        this.calcStatistics()
      } catch (err) {
        console.log(err)
      } finally {
        // quitar mascara
      }
    },
    roomIsVisible (room: IRoomDTO) {
      return room.max_capacity >= this.capacity && room.occupation >= this.occupation
    },
    calcStatistics () {
      this.capacity = 0
      this.maxCapacity = 0
      this.occupation = 0
      if (this.currFloor !== null) {
        this.currFloor.rooms.forEach((room: IRoomDTO) => {
          if (room.max_capacity > this.maxCapacity) this.maxCapacity = room.max_capacity
        })
      }
    },
    floorChanged (value: string | null) {
      const floor = this.getAllFloors.find((floor: IFloorDTO) => floor.name === value)
      if (floor !== undefined) {
        this.currFloor = floor
        this.calcStatistics()
      }
    },
    onAddRoom () {
      this.openModal({ 
        component: AddRoomDialog,
        props: {
          title: 'Alta Sala',
          functionCb: (data: IRoomDTO) => {
            this.addedRoom(data)
          }
        }
      })
    },
    addedRoom (roomData: IRoomDTO) {
      // en realidad deberiamos llamar getFloorData
      // metodo solo para que parezca que se ha hecho algo
      if (this.currFloor !== null) {
        this.currFloor.rooms.push({
          id: Math.floor(Math.random() * 1000000),
          name: roomData.name,
          max_capacity: roomData.max_capacity,
          occupation: roomData.occupation
        })
        this.calcStatistics()
      }
      // mostramos un supuesto mensaje de exito 
      this.openModal({ 
        component: InfoDialog,
        props: {
          title: 'Alta Sala',
          body: 'La sala se ha guardado con exito'
        }
      })
    },
    onModifiedRoom (roomData: IRoomDTO) {
      // en realidad deberiamos llamar getFloorData
      // metodo solo para que parezca que se ha hecho algo
      if (this.currFloor !== null) {
        this.currFloor.rooms.forEach((room: IRoomDTO) => {
          if (room.id === roomData.id) {
            room.name === roomData.name
            room.max_capacity === roomData.max_capacity
            room.occupation === roomData.occupation
          }
        })
        this.calcStatistics()
      }
    },
    onDeletedRoom (id: Number) {
      // en realidad deberiamos llamar getFloorData
      // metodo solo para que parezca que se ha hecho algo
      if (this.currFloor !== null && this.currFloor.rooms !== null) {
        this.currFloor.rooms = this.currFloor.rooms.filter((room) => room.id !== id)
        this.calcStatistics()
      }
    }
  }
}
</script>

<style scoped>
.container {
  .container-header {
    display: flex;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: .5em;
    .header-stats-switch {
      width: 150px;
      margin-left:1em;
    }
  }
  .container-floor-selector {
    width: 150px;
  }
  .divider {
    margin-bottom: 1.5em;
    border-color: lightgrey;
  }
  .room-planner {
    padding: 1em;
    border: 1px solid black;
    border-radius: 12px;
  }
  .floor-header {
    display: flex;
    margin-bottom: .5em;
    .floor-name {
      flex: 1;
      width: 100%;
      font-size: 16px;
    }
  }

  .floor-data {
    width: 100%;
    display: flex;
    .floor-data-controls {
      margin-top: 1em;
      margin-left: 1em;
      display: block;
      justify-content: flex-end;
      .floor-room-visibility {
        margin-top: 2em;
        width: 100%;
      }
    }
  }

  .room-chart {
    width: 100%;
    height: 100%;

    @media (max-width: 1280px) {
      width: 250px;
      height: 250px;
    }
    @media (max-width: 1050px) {
      width: 200px;
      height: 200px;
    }
    @media (max-width: 800px) {
      width: 150px;
      height: 150px;
    }
    @media (max-width: 500px) {
      width: 120px;
      height: 120px;
    }
  }

  .room-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-row-gap: 1em;
    grid-column-gap: 1em;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 650px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
}

.body {
  height: 100vh;
  margin: 0;
}
</style>: any[]: { name: any }: never: { name: string }: { name: any; max_capacity: any; occupation: any }: { id: any; name: any; max_capacity: any; occupation: any }: any: any[]: { name: any }: { max_capacity: number; occupation: number }: { name: string }: { name: any; max_capacity: any; occupation: any }: { id: any; name: any; max_capacity: any; occupation: any }: any: any[]: { name: any }: never: { name: string }: { name: any; max_capacity: any; occupation: any }: { id: any; name: any; max_capacity: any; occupation: any }: any: any[]: { name: any }: { max_capacity: number; occupation: number }: { name: string }: { name: any; max_capacity: any; occupation: any }: { id: any; name: any; max_capacity: any; occupation: any }: any: any[]: { name: any }: never: { name: string }: { name: any; max_capacity: any; occupation: any }: { id: any; name: any; max_capacity: any; occupation: any }: any: any[]: { name: any }: { max_capacity: number; occupation: number }: { name: string }: { name: any; max_capacity: any; occupation: any }: { id: any; name: any; max_capacity: any; occupation: any }: anyimport { mapStores, mapState } from 'pinia'

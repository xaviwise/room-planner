<template>
  <div class="inner addroom">
    <div class="header">
      <div class="header-title">{{ title }}</div>
      <label class="close-btn" @click="onClose">✕</label>
    </div>
    <div class="content">
      <v-form v-model="formValid">
        <v-text-field
          v-model="name"
          label="Nombre"
          :rules="nameRules"
          required
          variant="outlined"
          class="custom-textfield"
        />
        <v-text-field
          v-model="capacity"
          variant="outlined"
          type="number"
          required
          :rules="numberRules"
          class="custom-textfield"
          label="Capacidad máxima"
        />
        <v-text-field
          v-model="occupation"
          variant="outlined"
          type="number"
          required
          :rules="numberRules"
          min="0"
          max="100"
          oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
          class="custom-textfield"
          label="Ocupación %"
        /> 
        <div class="btn-container">
          <v-btn class="text-none text-subtitle-1 custom-button" @click="onAddRoom" text="Guardar"/>
          <v-btn class="text-none text-subtitle-1 custom-button" @click="onClose" text="Cancelar"/>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
import type IRoomDTO from '@/api/common/IRoomDTO'
import addRoom from '@/services/floorPlanner/addRoom.management'

export default {
  data: () => ({
    formValid: true,
    name: 'Nueva',
    capacity: 50,
    occupation: 0,
    nameRules: [
      (value: string) => {
        if (value) return true
        return 'Campo obligatorio'
      }
    ],
    numberRules: [
      (value: any) => {
        if (value === '') return 'Campo obligatorio'
        if (value >= 0) return true
        return 'Campo obligatorio'
      }
    ]
  }),
  props: {
    title: {
      type: String,
      default: null
    },
    functionCb: {
      type: Function,
      default: null
    }
  },
  methods: {
    onClose () {
      this.$emit('closed')
    },
    async onAddRoom () {
      if(this.formValid === true) {
        // normalmente aplicaria una mascara
        let response = null
        try {
          const params = {
            name: this.name,
            max_capacity: this.capacity,
            occupation: this.occupation
          }
          response = await addRoom(params as IRoomDTO)
          if (response?.result === true) {
            this.onClose()
            this.functionCb(params as IRoomDTO)
          }
        } catch (err) {
          console.log(err)
        } finally {
          // quitar mascara
        }
      }
    } 
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
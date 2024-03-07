<template>
  <div class="room">
    <div v-if="!editMode" class="name">Sala {{ getRoomName }}</div>
    <v-form v-model="formValid">
      <v-text-field
        v-model="name_"
        v-if="editMode"
        :rules="nameRules"
        required
        variant="solo"
        class="custom-textfield"
      />
      <v-text-field
        v-model="capacity_"
        class="custom-textfield"
        variant="solo"
        required
        :rules="numberRules"
        type="number"
        label="Capacidad máxima"
        :disabled="!editMode"
      />
      <v-text-field
        v-model="occupation_"
        class="custom-textfield"
        variant="solo"
        required
        type="number"
        label="Ocupación %"
        :rules="numberRules"
        min="0"
        max="100"
        oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
        :disabled="!editMode"
      /> 
    </v-form>
    <div class="btn-container">
      <v-btn class="text-none text-subtitle-1 custom-button" @click="onDeleteRoom"> {{ getDeleteButtonText }} </v-btn>
      <v-btn class="text-none text-subtitle-1 custom-button" @click="onEditRoom"> {{ getEditButtonText }} </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import InfoDialog from "@/components/modal/InfoDialog.vue"
import ConfirmDialog from "@/components/modal/ConfirmDialog.vue"
import useModalStore from "@/stores/useModalStore"
import deleteRoom from '@/services/floorPlanner/deleteRoom.management'
import updateRoom from '@/services/floorPlanner/updateRoom.management'
import { mapActions } from "pinia"

export default {
  data: () => ({
    formValid: true,
    editMode: false,
    name_: '',
    capacity_: 0,
    occupation_: 0,
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
    name: {
      type: String,
      default: null
    },
    id: {
      type: Number,
      default: -1
    },
    max_capacity: {
      type: Number,
      default: 0
    },
    occupation: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getRoomName () {
      return this.name_
    },
    getEditButtonText () {
      if (this.editMode === true) return 'Guardar'
      return 'Modificar'
    },
    getDeleteButtonText () {
      if (this.editMode === true) return 'Cancelar'
      return 'Eliminar'
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    ...mapActions(useModalStore, ['openModal','closeModal']),
    initData () {
      this.name_ = this.name
      this.capacity_ = this.max_capacity
      this.occupation_ = this.occupation
    },
    onDeleteRoom () {
      if ( this.editMode === true ) {
        this.editMode = !this.editMode
        return
      }
      this.openModal({ 
        component: ConfirmDialog,
        props: {
          title: 'Sala',
          body: '¿Confirmas que quieres borrar la sala?',
          functionCb: () => {
            this.onDeleteRoomConfirmed()
          }
        }
      })
    },
    async onDeleteRoomConfirmed () {
      // mascara
      let response = null
      try {
        const params = {
          id: this.id
        }
        response = await deleteRoom(params)
        if (response?.result === true) {
          // hacemos como que se ha borrado la sala
          this.$emit('deletedRoom', this.id)
          // mostramos un supuesto mensaje de exito 
          this.openModal({ 
            component: InfoDialog,
            props: {
              title: 'Sala',
              body: 'La sala se ha borrado con exito'
            }
          })
        }
      } catch (err) {
        console.log(err)
      } finally {
        // quitar mascara
      }
    },
    async onEditRoom () {
      if ( this.editMode === false ) {
        this.editMode = !this.editMode
        return
      }
      if(this.formValid === true) {
        // mascara
        let response = null
        try {
          const params = {
            id: this.id,
            name: this.name_,
            max_capacity: this.capacity_,
            occupation: this.occupation_
          }
          response = await updateRoom(params)
          if (response?.result === true) {
            // hacemos como que se ha modificado la sala
            this.$emit('modifiedRoom', params)
            // mostramos un supuesto mensaje de exito 
            this.openModal({ 
              component: InfoDialog,
              props: {
                title: 'Sala',
                body: 'La sala se ha modificado con exito'
              }
            })
            this.editMode = false
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
.room {
  padding: 1em;
  min-width: 170px;

  border-radius: 26px;
  background-color: var(--vt-c-lightblue-satec);
  .name {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: .5em;
  }
  .btn-container {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>

<template>
  <div class="inner confirm">
    <div class="header">
      <div class="header-title">{{ title }}</div>
      <label class="close-btn" @click="onClose">✕</label>
    </div>
    <div class="content">
      <p>{{ body }}</p>
      <div class="btn-container">
        <v-btn class="text-none text-subtitle-1 custom-button" @click="onConfirm">
          SI
        </v-btn>
        <v-btn class="text-none text-subtitle-1 custom-button" @click="onCancel">
          NO
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    body: {
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
    onConfirm () {
      this.onClose()
      this.functionCb()
    },
    onCancel (){
      this.onClose()
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
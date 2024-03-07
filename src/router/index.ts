import { createRouter, createWebHistory } from 'vue-router'
import RoomPlanner from '../views/RoomPlanner.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RoomPlanner
    }
  ]
})

export default router

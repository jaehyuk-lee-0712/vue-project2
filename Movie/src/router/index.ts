import DetailView from '../views/DetailView.vue'
import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail/:movieID',
      name: 'detail',
      component: DetailView,
      props: true
    }
  ]
})

export default router

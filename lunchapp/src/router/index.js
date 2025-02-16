import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LunchMenuListView from '@/views/LunchMenu/LunchMenuListView.vue'
import LunchMenuAddView from '@/views/LunchMenu/LunchMenuAddView.vue'
import LunchMenuView from '@/views/LunchMenu/LunchMenuView.vue'
import LunchMenuReadView from '@/views/LunchMenu/LunchMenuReadView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/lunchmenu',
    component: LunchMenuView,
    children: [
      {
        path: '',
        name: 'lunchmenulist',
        component: LunchMenuListView
      },
      {
        path: 'add',
        name: 'lunchmenuadd',
        component: LunchMenuAddView
      },
      {
        path: ':seq',
        name: 'lunchmenuread',
        component: LunchMenuReadView
      },
      {
        path: ':seq/edit',
        name: 'lunchmenuedit',
        component: LunchMenuAddView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/home',
    component: () => import('../views/Home')
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('../views/About')
  },
  {
    name: 'Permission',
    path: '/permission',
    component: () => import('../views/Permission')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

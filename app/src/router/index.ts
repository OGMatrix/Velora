import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Boot from '@/views/Boot.vue'
import Register from '@/views/auth/Register.vue'
import Language from '@/views/auth/Language.vue'
import Otp from '@/views/auth/Otp.vue'
import Login from '@/views/auth/Login.vue'
import Setup from '@/views/auth/Setup.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Boot',
    component: Boot
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/language',
    name: 'Language',
    component: Language
  },
  {
    path: '/auth/otp',
    name: 'Otp',
    component: Otp
  },
  {
    path: '/setup',
    name: 'Setup',
    component: Setup
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

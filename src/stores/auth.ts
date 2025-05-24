import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/models/User'
import router from '@/router'

const savedToken = localStorage.getItem('token')

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(savedToken)
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function setUser(userData: User) {
    user.value = userData
    token.value = userData.token
    localStorage.setItem('token', userData.token)
  }

  const isAdmin = computed(() => {
    return user.value?.roles.includes('ROLE_ADMIN') || false
  })

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/')
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    setToken,
    setUser,
    logout,
  }
})

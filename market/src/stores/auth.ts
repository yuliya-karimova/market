import { defineStore } from 'pinia'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

interface AuthState {
  user: string | null
  topics: string[]
  error: string
  registerError: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    topics: [],
    error: '',
    registerError: '',
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/login`,
          { username, password },
          { withCredentials: true }
        )
        this.user = response.data.username
        this.topics = response.data.topics
        this.error = ''
      } catch (err) {
        console.error(err) // Логирование
        this.error = 'Invalid credentials'
      }
    },
    async register(username: string, password: string) {
      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/register`,
          { username, password },
          { withCredentials: true }
        )
        this.user = response.data.username
        this.topics = response.data.topics
        this.registerError = ''
      } catch (err: any) {
        console.error(err) // Логирование
        this.registerError = err.response?.data?.message || 'Registration error'
      }
    },
    async updateTopics(topics: string[]) {
      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/update-profile`,
          { topics },
          { withCredentials: true }
        )
        this.topics = response.data.topics
      } catch (err) {
        console.error(err) // Логирование
      }
    },
    async logout() {
      try {
        await axios.post(`${apiBaseUrl}/api/logout`, {}, { withCredentials: true })
        this.user = null
        this.topics = []
      } catch (err) {
        console.error(err) // Логирование
      }
    },
    async checkAuth() {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/profile`, { withCredentials: true })
        this.user = response.data.username || null
        this.topics = response.data.topics || []
      } catch (err) {
        console.error(err) // Логирование
        this.user = null
        this.topics = []
      }
    }
  }
})

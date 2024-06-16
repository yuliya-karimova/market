import { defineStore } from 'pinia'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

interface NewsInterface {
  title: string
  description: string
  link: string
  date: string
}

interface AnalyticsInterface {
  content: string
  link: string
  source: string
}

interface NewsState {
  analyticNews: NewsInterface[]
  analytic: AnalyticsInterface[]
}

export const useNewsStore = defineStore('news', {
  state: (): NewsState => ({
    analyticNews: [],
    analytic: []
  }),
  actions: {
    async fetchAnalyticNews() {
      if (this.analyticNews.length) {
        return
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/analytic-news`)
        this.analyticNews = response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'An error occurred'
      }
    },
    async fetchAnalytic() {
      if (this.analytic.length) {
        return
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/collect-analytics`)
        this.analytic = response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'An error occurred'
      }
    }
  }
})

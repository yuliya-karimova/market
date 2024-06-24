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
  topicNews: string | null
}

export const useNewsStore = defineStore('news', {
  state: (): NewsState => ({
    analyticNews: [],
    analytic: [],
    topicNews: null
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
    async fetchAnalytic(isNew = false) {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/collect-analytics`, {
          params: {
            is_new: isNew
          }
        })
        this.analytic = response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'An error occurred'
      }
    },
    async getNewsByTopics(topics: string[]) {
      if (this.topicNews) {
        return
      }
      
      try {
        const response = await axios.get(`${apiBaseUrl}/api/find-topics`, {
          params: {
            topics: topics.join(','),
          }
        })
        this.topicNews = response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'An error occurred'
      }
    }
  }
})

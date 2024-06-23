import { defineStore } from 'pinia'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

interface PredictionInterface {
  link: string
  report: string
  acf_pacf_chart: Object
  forecast_chart: Object
}

interface CompareInterface {
  pic?: Object
  text?: string
}

interface ReportState {
  prediction: PredictionInterface | null
  compareResult: CompareInterface[]
}

export const useReportStore = defineStore('report', {
  state: (): ReportState => ({
    prediction: null,
    compareResult: []
  }),
  actions: {
    async checkCompany(company: string, isNew = false): Promise<string> {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/check-company`, {
          params: {
            company: company,
            is_new: isNew
          }
        })
        return response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'Не удалось получить данные'
      }
    },
    async getNextYearPrediction(isNew = false) {
      if (this.prediction) {
        return
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/predict-next-year`, {
          params: {
            is_new: isNew
          }
        })
        this.prediction = response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'Не удалось получить данные'
      }
    },
    async compare(isNew: boolean) {
      if (this.compare.length) {
        return
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/compare-prices`, {
          params: {
            is_new: isNew
          }
        })
        this.compareResult = response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'Не удалось получить данные'
      }
    }
  }
})

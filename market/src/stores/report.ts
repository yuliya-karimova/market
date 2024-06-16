import { defineStore } from 'pinia'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

interface PredictionInterface {
  link: string
  report: string
  acf_pacf_chart: Object
  forecast_chart: Object
}

interface ReportState {
  prediction: PredictionInterface | null
}

export const useReportStore = defineStore('report', {
  state: (): ReportState => ({
    prediction: null,
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
    async getNextYearPrediction() {
      if (this.prediction) {
        return
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/predict-next-year`)
        this.prediction = response.data.data
      } catch (err: any) {
        return err.response?.data?.error || 'Не удалось получить данные'
      }
    }
  }
})

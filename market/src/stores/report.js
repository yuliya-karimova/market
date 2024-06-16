import { defineStore } from 'pinia';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const useReportStore = defineStore('report', {
    state: () => ({
        prediction: null,
        compareResult: [],
    }),
    actions: {
        async checkCompany(company, isNew = false) {
            try {
                const response = await axios.get(`${apiBaseUrl}/api/check-company`, {
                    params: {
                        company: company,
                        is_new: isNew
                    }
                });
                return response.data.data;
            }
            catch (err) {
                return err.response?.data?.error || 'Не удалось получить данные';
            }
        },
        async getNextYearPrediction() {
            if (this.prediction) {
                return;
            }
            try {
                const response = await axios.get(`${apiBaseUrl}/api/predict-next-year`);
                this.prediction = response.data.data;
            }
            catch (err) {
                return err.response?.data?.error || 'Не удалось получить данные';
            }
        },
        async compare(isNew) {
            if (this.compare.length) {
                return;
            }
            try {
                const response = await axios.get(`${apiBaseUrl}/api/compare-prices`, {
                    params: {
                        is_new: isNew
                    }
                });
                this.compareResult = response.data.data;
            }
            catch (err) {
                return err.response?.data?.error || 'Не удалось получить данные';
            }
        }
    }
});

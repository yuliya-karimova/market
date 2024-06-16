<template>
  <div class="py-12 w-full">
    <RouterLink to="/analytics">
      <BaseButton look="link" theme="secondary" class="!p-0 max-w-min">
        <div class="flex gap-2 items-center font-normal">
          <BaseIcon name="outline_arrow_left" size="xs" />
          <span>Назад к выбору отчета</span>
        </div>
      </BaseButton>
    </RouterLink>
    <h1 class="text-4xl text-primary-800 uppercase font-mont mb-12">Прогноз цен на металл</h1>
    <div class="mb-6">
      Мы собрали данные из открытых источников за 10 лет и обучили модель, которая предсказывает
      цены на металлы. Вам будет представлен анализ с графиками и подробным описанием прогноза.
    </div>
    <BaseButton theme="secondary" @click="getPrediction"> Получить прогноз </BaseButton>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="reportStore.prediction" class="px-10 pt-10 pb-5 bg-white shadow-sm rounded-xl mt-12">
      <h2 class="font-bold text-3xl mb-2">Прогноз цен на металл</h2>
      <div class="mb-12">
        Источник данных по ценам:
        <BaseLink :href="reportStore.prediction.link">{{ reportStore.prediction.link }}</BaseLink>
      </div>
      <h2 class="text-center">ACF and PACF Chart</h2>
      <img
        :src="'data:image/png;base64,' + reportStore.prediction.acf_pacf_chart"
        alt="ACF and PACF Chart"
      />
      <img
        :src="'data:image/png;base64,' + reportStore.prediction.forecast_chart"
        alt="Forecast Chart"
      />
      <h2 class="font-bold text-3xl mt-12 mb-4">Расшифровка и анализ</h2>
      <MarkdownBlock :content="reportStore.prediction.report" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useReportStore } from '@/stores/report'
import BaseButton from '@/components/base/button/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseIcon from '@/components/base/icon/BaseIcon.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import { companiesOptions } from '@/models/companies'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import { RouterLink } from 'vue-router'

const error = ref<string>('')
const loading = ref<boolean>(false)

const reportStore = useReportStore()

const getPrediction = async () => {
  loading.value = true
  error.value = ''

  try {
    await reportStore.getNextYearPrediction()
    // if (typeof result === 'string') {
    //   report.value = result
    // } else {
    //   throw new Error(result)
    // }
  } catch (err: any) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

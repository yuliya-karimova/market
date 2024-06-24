<template>
  <div class="py-6 sm:py-12 w-full">
    <RouterLink to="/analytics">
      <BaseButton look="link" theme="secondary" class="!p-0 max-w-min">
        <div class="flex gap-2 items-center font-normal">
          <BaseIcon name="outline_arrow_left" size="xs" />
          <span>Назад к выбору отчета</span>
        </div>
      </BaseButton>
    </RouterLink>
    <h1 class="text-3xl sm:text-4xl text-primary-800 uppercase font-mont mb-12">
      Прогноз цен на металл
    </h1>
    <div class="mb-6 flex flex-col gap-4">
      <div>
        Мы собрали данные из открытых источников за 10 лет и обучили модель, которая предсказывает
        цены на металлы. Вам будет представлен анализ с графиками и подробным описанием прогноза.
      </div>
      <div>
        Внизу для вашего удобства и экономии времени и ресурсов представлен прогноз, сформированный
        во время предыдущего запроса.
      </div>
      <div>
        Если вы хотите получить новый прогноз, нажмите на кнопку "Получить новый прогноз".
        Пожалуйста, обратите внимание, что при создании обновленного прогноза потребуется
        дополнительное время для сбора данных, их обработки с помощью модели машинного обучения и
        получения результатов.
      </div>
    </div>
    <div class="flex gap-4 flex-wrap">
      <!-- <BaseButton theme="secondary" @click="() => getPrediction()"> Получить готовый прогноз </BaseButton> -->
      <BaseButton theme="secondary" @click="() => getPrediction(true)">
        Сгенерировать новый прогноз
      </BaseButton>
      <BaseLink v-if="reportStore.prediction?.pdf" :href="getFileUrl(reportStore.prediction.pdf)">
        <BaseButton> Скачать PDF </BaseButton>
      </BaseLink>
      <BaseLink v-if="reportStore.prediction?.pdf" :href="getFileUrl(reportStore.prediction.docx)">
        <BaseButton> Скачать DOCX </BaseButton>
      </BaseLink>
    </div>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div v-if="error">{{ error }}</div>
    <div
      v-if="reportStore.prediction"
      class="px-5 sm:px-10 pt-5 sm:pt-10 pb-5 bg-white shadow-sm rounded-xl mt-16"
    >
      <h2 class="font-bold text-3xl mb-2">Прогноз цен на металл</h2>
      <div class="mb-12">
        Источник данных по ценам:
        <BaseLink
          :href="reportStore.prediction.result.link"
          target="_blank"
          class="!block break-words"
          >{{ reportStore.prediction.result.link }}</BaseLink
        >
      </div>
      <h2 class="text-center">ACF and PACF Chart</h2>
      <img
        :src="'data:image/png;base64,' + reportStore.prediction.result.acf_pacf_chart"
        alt="ACF and PACF Chart"
      />
      <img
        :src="'data:image/png;base64,' + reportStore.prediction.result.forecast_chart"
        alt="Forecast Chart"
      />
      <h2 class="font-bold text-3xl mt-12 mb-4">Расшифровка и анализ</h2>
      <MarkdownBlock :content="reportStore.prediction.result.report" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReportStore } from '@/stores/report'
import BaseButton from '@/components/base/button/BaseButton.vue'
import BaseIcon from '@/components/base/icon/BaseIcon.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import { RouterLink } from 'vue-router'
import BaseLink from '@/components/base/BaseLink.vue'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const error = ref<string>('')
const loading = ref<boolean>(false)

const reportStore = useReportStore()

const getFileUrl = (path: string) => {
  return `${apiBaseUrl}/${path}`
}

const getPrediction = async (isNew = false) => {
  loading.value = true
  error.value = ''

  try {
    await reportStore.getNextYearPrediction(isNew)
  } catch (err: any) {
    error.value = err.message || 'Ошибка'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getPrediction(false)
})
</script>

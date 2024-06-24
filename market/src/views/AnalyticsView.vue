<template>
  <div class="py-6 sm:py-12 w-full">
    <h1 class="text-3xl sm:text-4xl text-primary-800 uppercase font-mont mb-12">Аналитика и прогнозы</h1>
    <div class="text-xl font-bold mb-4">Выберите вид анализа рынка</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="report in reportList"
        :key="report.id"
        class="bg-white rounded-xl shadow-sm p-6 cursor-pointer transition duration-150 hover:shadow-lg"
        @click="report.action"
      >
        <div class="flex gap-2 mb-2">
          <BaseIcon v-if="report.icon" :name="report.icon" size="sm" />
          <div class="font-bold text-lg leading-5">{{ report.title }}</div>
        </div>
        <div>{{ report.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseIcon from '@/components/base/icon/BaseIcon.vue'

const router = useRouter()

const reportList = [
  {
    title: 'Анализ цен',
    id: 'market',
    description: 'Анализ цен компании Северсталь в сравнении с конкурентами.',
    icon: 'outline_document_report',
    action: () => {
      router.push('/analytics/compare')
    }
  },
  {
    title: 'Прогноз цен',
    id: 'company',
    description: 'Получить профессиональный прогноз цен с графиками с помощью машинного обучения на основании данных за 10 лет.',
    icon: 'outline_presentation_chart_line',
    action: () => {
      router.push('/analytics/prices')
    }
  },
  {
    title: 'Анализ компании',
    id: 'company',
    description: 'Проанализировать компанию-конкурента по готовому шаблону или применить свой с помощью LLM.',
    icon: 'outline_document_search',
    action: () => {
      router.push('/analytics/company')
    }
  },
  {
    title: 'Аналитика рынка',
    id: 'market',
    description: 'Получить краткую сводку анализа рынка металла на основе открытых источников из интернета.',
    icon: 'outline_chart_bar',
    action: () => {
      router.push('/analytics/market')
    }
  },
  {
    title: 'Не нашли нужный формат?',
    id: 'talk',
    description: 'Спросите искусственный интеллект в свободной форме.',
    icon: 'outline_emoji_happy',
    action: () => {
      router.push('/analytics/talk')
    }
  },
]
</script>

<template>
  <div class="flex flex-col gap-16">
    <!-- Выбор тематики анализа -->
    <section class="mb-4" ref="analysisBlock">
      <h2 class="text-xl mb-2">Выбор тематики анализа</h2>
      <select v-model="selectedTemplate" @change="onTemplateChange" class="border p-2 rounded">
        <option v-for="(label, value) in topicsOptions" :key="value" :value="value">
          {{ label }}
        </option>
        <!-- <option value="custom">Создать новую</option> -->
      </select>
    </section>

    <!-- Настройка параметров отчета -->
    <section v-if="selectedTemplate" class="mb-4">
      <h2 class="text-xl mb-2">Настройка параметров отчета</h2>
      <div class="mb-2">
        <label class="block mb-1">Временные рамки исследования</label>
        <input type="date" v-model="reportParams.dateFrom" class="border p-2 rounded mb-1" />
        <input type="date" v-model="reportParams.dateTo" class="border p-2 rounded" />
      </div>
      <div class="mb-2">
        <label class="block mb-1">Ключевые слова</label>
        <input type="text" v-model="reportParams.keywords" class="border p-2 rounded w-full" />
      </div>
      <div class="mb-2">
        <label class="block mb-1">Источники данных</label>
        <input type="text" v-model="reportParams.sources" class="border p-2 rounded w-full" />
      </div>
      <div class="mb-2">
        <label class="block mb-1">Желаемая глубина анализа</label>
        <input type="text" v-model="reportParams.depth" class="border p-2 rounded w-full" />
      </div>
      <div class="mb-2">
        <label class="block mb-1">Формат представления результатов</label>
        <select v-model="reportParams.format" class="border p-2 rounded w-full">
          <option value="graphs">Графики</option>
          <option value="tables">Таблицы</option>
          <option value="text">Текстовые выводы</option>
        </select>
      </div>
      <button @click="generateReport" class="bg-blue-500 text-white p-2 rounded">
        Сгенерировать отчет
      </button>
    </section>

    <!-- Генерация отчета и работа с готовым отчетом -->
    <section v-if="reportGenerated" class="mb-4">
      <h2 class="text-xl mb-2">Готовый отчет</h2>
      <div class="mb-2">
        <p><strong>Тематика анализа:</strong> {{ selectedTemplate }}</p>
        <p>
          <strong>Временные рамки:</strong> {{ reportParams.dateFrom }} - {{ reportParams.dateTo }}
        </p>
        <p><strong>Ключевые слова:</strong> {{ reportParams.keywords }}</p>
        <p><strong>Источники данных:</strong> {{ reportParams.sources }}</p>
        <p><strong>Глубина анализа:</strong> {{ reportParams.depth }}</p>
        <p><strong>Формат представления:</strong> {{ reportParams.format }}</p>
      </div>
      <button @click="exportReport('pdf')" class="bg-green-500 text-white p-2 rounded mr-2">
        Экспортировать в PDF
      </button>
      <button @click="exportReport('docx')" class="bg-green-500 text-white p-2 rounded mr-2">
        Экспортировать в DOCX
      </button>
      <button @click="exportReport('xlsx')" class="bg-green-500 text-white p-2 rounded">
        Экспортировать в XLSX
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/button/BaseButton.vue'
import { topicsOptions } from '@/models/topics'
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'

const analysisBlock = ref<HTMLDivElement | undefined>(undefined)

const scrollTo = (id: string) => {
  let top = 0
  const offset = 100

  switch (id) {
    case 'analysis':
      top = (analysisBlock.value?.offsetTop || 0) - offset
      break
    case 'top':
      break
    default:
      break
  }

  window.scrollTo({ left: 0, top: top, behavior: 'smooth' })
}

const templates = ['финансовый анализ', 'рыночные исследования', 'анализ конкурентной среды']

const selectedTemplate = ref<string | null>(null)
const reportParams = reactive({
  dateFrom: '',
  dateTo: '',
  keywords: '',
  sources: '',
  depth: '',
  format: 'graphs'
})

const reportGenerated = ref(false)

const onTemplateChange = () => {
  if (selectedTemplate.value === 'custom') {
    selectedTemplate.value = null
  }
}

const generateReport = () => {
  reportGenerated.value = true
  // Здесь можно добавить логику для генерации отчета
}

const exportReport = (format: string) => {
  // Здесь можно добавить логику для экспорта отчета в выбранный формат
  alert(`Отчет экспортирован в формате ${format.toUpperCase()}`)
}
</script>

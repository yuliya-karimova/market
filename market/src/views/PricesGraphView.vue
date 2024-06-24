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
      График цен на металл
    </h1>
    <div class="mb-6 flex flex-col gap-4">
      <BaseSelect
        v-if="!isUseCustomDates"
        v-model="period"
        label="Выберите период"
        placeholder="Период"
        name="period"
        :options="PERIOD_OPTIONS"
        required
      />
      <template v-else>
        <BaseInput v-model="startDate" label="Дата начала" name="startDate" type="date" required />
        <BaseInput v-model="endDate" label="Дата окончания" name="endDate" type="date" required />
      </template>
      <!-- <BaseCheckbox
        v-model="isUseCustomDates"
        name="isUseCustomDates"
        label="Использовать свой период"
      /> -->
      <div>
        <BaseButton theme="secondary" @click="getPrices"> Получить отчет </BaseButton>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div v-if="error">{{ error }}</div>
    <div
      v-if="report"
      class="px-5 sm:px-10 pt-5 sm:pt-10 pb-5 bg-white shadow-sm rounded-xl mt-16"
    >
      <div class="mb-12">
        Источник данных по ценам:
        <BaseLink
          :href="report.link"
          target="_blank"
          class="!block break-words"
        >
          {{ report.link }}
        </BaseLink>
      </div>
      <img
        :src="'data:image/png;base64,' + report.result"
        alt="ACF and PACF Chart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useReportStore } from '@/stores/report'
import BaseButton from '@/components/base/button/BaseButton.vue'
import BaseIcon from '@/components/base/icon/BaseIcon.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import { RouterLink } from 'vue-router'
import BaseLink from '@/components/base/BaseLink.vue'
import { OptionInterface } from '@/components/base/use-input'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseInput from '@/components/base/BaseInput.vue'

const error = ref<string>('')
const loading = ref<boolean>(false)
const isUseCustomDates = ref(false)

const PERIOD_OPTIONS: OptionInterface[] = [
  { value: 'year', label: 'Год' },
  { value: 'quarter', label: 'Квартал' },
  { value: 'last_year', label: 'Прошлый год' }
]

const period = ref<string | undefined>(PERIOD_OPTIONS[0].value as string)
const startDate = ref<string | undefined>(undefined)
const endDate = ref<string | undefined>(undefined)

const reportStore = useReportStore()

const report = ref<any>(undefined)

const getPrices = async () => {
  loading.value = true
  error.value = ''

  if (!period.value && (!startDate.value || !endDate.value)) {
    error.value = 'Выберите период для анализа'
    return
  }

  try {
    report.value = await reportStore.getPrices(isUseCustomDates.value ? undefined : period.value, startDate.value, endDate.value)
  } catch (err: any) {
    error.value = err.message || 'Ошибка'
  } finally {
    loading.value = false
  }
}
</script>

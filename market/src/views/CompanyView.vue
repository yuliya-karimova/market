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
    <h1 class="text-4xl text-primary-800 uppercase font-mont mb-12">Отчет по компании</h1>
    <form class="w-full mb-12 max-w-2xl">
      <BaseSelect
        v-if="isUseCompanySelect"
        v-model="companyName"
        label="Выберите компанию из списка"
        description="Для этих компаний можно получить либо заранее заготовленный отчет, либо сгенерировать новый"
        placeholder="Компания"
        name="Компания"
        :options="companiesOptions"
        required
      />
      <BaseInput
        v-else
        v-model="companyName"
        label="Введите название компании для анализа"
        name="Компания"
        inputBackgroundClass="bg-white"
        placeholder="Компания"
        required
      />
      <div class="text-sm mt-2">
        <div v-if="isUseCompanySelect">
          <span> Нет компании, которую вы хотите проанализировать? </span>
          <div
            class="text-accent-500 hover:text-accent-400 cursor-pointer flex items-center gap-2 w-max"
            @click="isUseCompanySelect = false"
          >
            <div>Перейти к вводу названия</div>
            <BaseIcon name="outline_arrow_right" size="xs" />
          </div>
        </div>
        <div
          v-else
          class="text-accent-500 hover:text-accent-400 cursor-pointer flex items-center gap-2 w-max"
          @click="isUseCompanySelect = true"
        >
          <BaseIcon name="outline_arrow_left" size="xs" />
          <div>Вернуться к списку компаний</div>
        </div>
      </div>
      <div class="mt-12 flex gap-4">
        <template v-if="isUseCompanySelect">
          <BaseButton theme="primary" @click="() => getCompanyReport(true)">
            Сгенерировать новый отчет
          </BaseButton>
          <BaseButton theme="secondary" @click="() => getCompanyReport(false)">
            Получить готовый отчет
          </BaseButton>
        </template>
        <BaseButton v-else theme="secondary" @click="() => getCompanyReport(true)"
          >Сгенерировать отчет</BaseButton
        >
      </div>
    </form>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="report" class="px-10 py-5 bg-white shadow-sm rounded-xl">
      <MarkdownBlock :content="report" />
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

const companyName = ref<string>('')
const report = ref<string>('')
const error = ref<string>('')
const loading = ref<boolean>(false)
const isUseCompanySelect = ref<boolean>(true)

const reportStore = useReportStore()

const getCompanyReport = async (isNew = false) => {
  if (!companyName.value) {
    error.value = 'Введите название компании для анализа.'
    return
  }

  loading.value = true
  error.value = ''
  report.value = ''

  try {
    const result = await reportStore.checkCompany(companyName.value, isNew)
    if (typeof result === 'string') {
      report.value = result
    } else {
      throw new Error(result)
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

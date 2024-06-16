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
    <h1 class="text-4xl text-primary-800 uppercase font-mont mb-12">Сравнение с конкурентами</h1>
    <div class="mb-6">
      Мы собрали цены на продукцию основных конкурентов компании Северсталь и провели сравнительный
      анализ.
    </div>
    <div class="flex gap-4">
      <BaseButton @click="() => getPrediction(true)"> Сгенерировать новый отчет </BaseButton>
      <BaseButton theme="secondary" @click="() => getPrediction(false)">
        Получить готовый
      </BaseButton>
    </div>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div v-if="error">{{ error }}</div>
    <div
      v-if="reportStore.compareResult.length"
      class="px-10 pt-10 pb-5 bg-white shadow-sm rounded-xl mt-12"
    >
      <div v-for="(res, index) in reportStore.compareResult" :key="index">
        <img v-if="res.pic" :src="'data:image/png;base64,' + res.pic" alt="pic" />
        <MarkdownBlock v-if="res.text" :content="res.text" />
      </div>
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

const error = ref<string>('')
const loading = ref<boolean>(false)

const reportStore = useReportStore()

const getPrediction = async (isNew: boolean) => {
  loading.value = true
  error.value = ''

  try {
    await reportStore.compare(isNew)
  } catch (err: any) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

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
      Спроси искусственный интеллект
    </h1>
    <div class="flex flex-col gap-4">
      <div v-for="(item, index) in dialog" :key="index">
        <span class="font-bold">{{ `${item.who}: ` }}</span>
        <span>{{ item.text }}</span>
      </div>
      <BaseTextarea
        v-model="newQuestion"
        placeholder="Задай вопрос"
        class="w-full text-left"
        name="description"
        rows="5"
      />
      <div class="mb-12">
        <BaseButton theme="secondary" @click="talkToAi"> Спросить </BaseButton>
      </div>
      <div v-if="loading">
        <BaseSpinner />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useReportStore } from '@/stores/report'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import { RouterLink } from 'vue-router'

const loading = ref<boolean>(false)
const dialog = ref<{ who: string; text: string }[]>([])
const newQuestion = ref('')

const reportStore = useReportStore()

const talkToAi = async () => {
  dialog.value.push({ who: 'Вы', text: newQuestion.value })

  loading.value = true

  const response = await reportStore.talkToAi(newQuestion.value)
  dialog.value.push({ who: 'ИИ', text: response })

  loading.value = false
  newQuestion.value = ''
}
</script>

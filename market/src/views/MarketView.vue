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
    <h1 class="text-3xl sm:text-4xl text-primary-800 uppercase font-mont mb-12">Анализ рынка металла</h1>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div v-else-if="newsStore.analytic.length" class="div">
      <div
        v-for="item in newsStore.analytic"
        :key="item.link"
        class="px-10 py-5 bg-white shadow-sm rounded-xl"
      >
        <MarkdownBlock v-if="item.content" :content="item.content" />
        <div>
          Источник:
          <BaseLink v-if="item.link" :href="item.link" class="font-normal mb-4 text-md" target="_blank">
            {{ item.source }}
          </BaseLink>
        </div>
      </div>
    </div>
    <div v-else>Извините, не удалось собрать данные по аналитике рынка.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNewsStore } from '@/stores/news'
import BaseLink from '@/components/base/BaseLink.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import { RouterLink } from 'vue-router'

const loading = ref<boolean>(false)

const newsStore = useNewsStore()

onMounted(async () => {
  loading.value = true
  await newsStore.fetchAnalytic()
  loading.value = false
})
</script>

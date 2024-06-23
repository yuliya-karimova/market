<template>
  <div class="py-6 sm:py-12 w-full">
    <h1 class="text-3xl sm:text-4xl text-primary-800 uppercase font-mont mb-12">Новости</h1>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div
      v-else-if="newsStore.analyticNews.length"
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <div
        v-for="news in newsStore.analyticNews"
        :key="news.title"
        class="bg-white rounded-xl shadow-sm p-6"
      >
        <div class="font-bold text-xl mb-4 text-primary-800">{{ news.title }}</div>
        <div class="line-clamp-3 text-sm">{{ news.description }}</div>
        <BaseLink v-if="news.link" :href="news.link" class="font-normal mb-4 text-sm" target="_blank">
          Продолжить чтение
        </BaseLink>
        <div class="capitalize text-sm">{{ news.date }}</div>
      </div>
    </div>
    <div v-else>Извините, нет подходящих новостей</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNewsStore } from '@/stores/news'
import BaseLink from '@/components/base/BaseLink.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'

const loading = ref<boolean>(false)

const newsStore = useNewsStore()

onMounted(async () => {
  loading.value = true
  await newsStore.fetchAnalyticNews()
  loading.value = false
})
</script>

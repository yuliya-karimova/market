<template>
  <div class="py-6 sm:py-12 w-full">
    <h1 class="text-3xl sm:text-4xl text-primary-800 uppercase font-mont mb-12">Новости</h1>
    <div v-if="authStore.user" class="flex gap-4 flex-wrap mb-8">
      <BaseButton theme="secondary" @click="getNewsByTopics"> Новости по моим темам </BaseButton>
      <BaseButton @click="getAllNews"> Все новости </BaseButton>
    </div>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <template v-else>
      <template v-if="isAllNews">
        <div
          v-if="newsStore.analyticNews.length"
          class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <div
            v-for="news in newsStore.analyticNews"
            :key="news.title"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <div class="font-bold text-xl mb-4 text-primary-800">{{ news.title }}</div>
            <div class="line-clamp-3 text-sm">{{ news.description }}</div>
            <BaseLink
              v-if="news.link"
              :href="news.link"
              class="font-normal mb-4 text-sm"
              target="_blank"
            >
              Продолжить чтение
            </BaseLink>
            <div class="capitalize text-sm">{{ news.date }}</div>
          </div>
        </div>
        <div v-else>Извините, нет подходящих новостей</div>
      </template>
      <template v-else>
        <div v-if="!authStore.topics.length">
          <div class="mb-4">Сначала нужно выбрать интересующие вас темы в личном кабинете</div>
          <RouterLink to="/profile">
            <BaseButton>
              Личный кабинет
            </BaseButton>
          </RouterLink>
        </div>

        <div
          v-else-if="newsStore.topicNews"
          class="px-5 sm:px-10 py-5 bg-white shadow-sm rounded-xl"
        >
          <MarkdownBlock :content="newsStore.topicNews" />
        </div>
        <div v-else>Извините, нет подходящих новостей</div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNewsStore } from '@/stores/news'
import BaseLink from '@/components/base/BaseLink.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/base/button/BaseButton.vue'
import { RouterLink } from 'vue-router'
import MarkdownBlock from '@/components/MarkdownBlock.vue'

const loading = ref<boolean>(false)
const isAllNews = ref(true)

const newsStore = useNewsStore()
const authStore = useAuthStore()

onMounted(async () => {
  loading.value = true
  await newsStore.fetchAnalyticNews()
  loading.value = false
})

const getAllNews = async () => {
  isAllNews.value = true

  loading.value = true
  await newsStore.fetchAnalyticNews()
  loading.value = false
}

const getNewsByTopics = async () => {
  isAllNews.value = false

  if (!authStore.topics.length) {
    return
  }

  loading.value = true

  await newsStore.getNewsByTopics(authStore.topics || [])
  loading.value = false
}
</script>

<template>
  <div class="py-12 w-full">
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div
      v-else-if="newsStore.analytic.length"
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <div
        v-for="item in newsStore.analytic"
        :key="item.link"
        class="px-10 py-5 bg-white shadow-sm rounded-xl"
      >
        <MarkdownBlock v-if="item.content" :content="item.content" />
        <div>
          Источник:
          <BaseLink v-if="item.link" :href="item.link" class="font-normal mb-4 text-md">
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

const loading = ref<boolean>(false)

const newsStore = useNewsStore()

onMounted(async () => {
  loading.value = true
  await newsStore.fetchAnalytic()
  loading.value = false
})
</script>

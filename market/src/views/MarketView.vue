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
      Анализ рынка металла
    </h1>
    <div class="mb-6 flex flex-col gap-4">
      <div>
        Мы систематически анализируем аналитические статьи и информацию из различных открытых
        источников. После этого, с помощью большой языковой модели мы формируем комплексную сводку,
        которая охватывает ключевые аспекты обсуждаемых вопросов.
      </div>
      <div>
        Внизу для вашего удобства и экономии времени и ресурсов представлена аналитика,
        сформированная во время предыдущего запроса.
      </div>
      <div>
        Если вы хотите получить новую аналитику, нажмите на кнопку "Провести новый анализ".
        Пожалуйста, обратите внимание, что при создании обновленной сводки аналитики потребуется
        дополнительное время для сбора данных и их обработки с помощью языковой модели.
      </div>
    </div>
    <div class="flex gap-4 flex-wrap">
      <!-- <BaseButton theme="secondary" @click="() => fetchAnalytic()"> Получить готовую аналитику </BaseButton> -->
      <BaseButton theme="secondary" @click="() => fetchAnalytic(true)">
        Провести новый анализ
      </BaseButton>
    </div>
    <div v-if="loading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>
    <div v-else-if="newsStore.analytic.length" class="mt-16">
      <div
        v-for="item in newsStore.analytic"
        :key="item.link"
        class="p-5 sm:p-10 bg-white shadow-sm rounded-xl"
      >
        <MarkdownBlock v-if="item.content" :content="item.content" />
        <div>
          Источник:
          <BaseLink v-if="item.link" :href="item.link" class="font-normal text-md" target="_blank">
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

const fetchAnalytic = async (isNew = false) => {
  loading.value = true
  await newsStore.fetchAnalytic(isNew)
  loading.value = false
}

onMounted(async () => {
  await fetchAnalytic(false)
})
</script>

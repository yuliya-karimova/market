<template>
  <div>
    <div class="flex items-center py-8 lg:py-16 gap-6 font-mont max-sm:text-center">
      <div class="w-full lg:w-1/2">
        <div class="text-lg sm:text-xl lg:text-3xl uppercase">Быстрый и удобный</div>
        <h1 class="font-bold text-4xl lg:text-6xl uppercase">Конструктор</h1>
        <div class="text-lg lg:text-2xl mb-8">
          для автоматического создания<br />аналитических отчетов
        </div>
        <div class="flex max-sm:justify-center flex-wrap gap-4">
          <RouterLink to="/analytics">
            <BaseButton size="lg"> Выбрать вид анализа </BaseButton>
          </RouterLink>
          <RouterLink to="/analytics/compare">
            <BaseButton size="lg" theme="secondary"> Анализ конкурентов </BaseButton>
          </RouterLink>
        </div>
      </div>
      <img alt="home pic" class="max-sm:hidden w-1/2 h-auto" src="/pic2.png" />
    </div>
    <AboutBlock />
  </div>
</template>

<script setup lang="ts">
import AboutBlock from '@/components/AboutBlock.vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import { RouterLink } from 'vue-router'
</script>

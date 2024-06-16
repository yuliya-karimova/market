<template>
  <div>
    <div class="flex items-center py-16 gap-6 font-mont">
      <div class="w-1/2">
        <div class="text-xl lg:text-3xl uppercase">Быстрый и удобный</div>
        <h1 class="font-bold text-4xl lg:text-6xl uppercase">Конструктор</h1>
        <div class="text-lg lg:text-2xl mb-8">
          для автоматического создания<br />аналитических отчетов
        </div>
        <RouterLink to="/analytics">
          <BaseButton size="xl" theme="secondary"> Перейти к анализу </BaseButton>
        </RouterLink>
      </div>
      <img alt="home pic" class="w-1/2 h-auto" src="/pic2.png" />
    </div>

    <AboutBlock />
  </div>
</template>

<script setup lang="ts">
import AboutBlock from '@/components/AboutBlock.vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import { RouterLink } from 'vue-router'
</script>

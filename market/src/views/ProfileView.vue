<template>
  <div class="py-12 flex flex-col items-center">
    <div class="w-full max-w-3xl">
      <h1 class="text-4xl text-primary-800 uppercase font-mont mb-12">Настройки профиля</h1>
      <form @submit.prevent="handleSave" class="mb-2 bg-white shadow-sm rounded-xl px-8 py-8">
        <BaseCheckboxGroup
          v-model="authStore.topics"
          title="Выберите интересующие вас тематики:"
          :options="topicsOptions"
          name="topics"
        />
        <div class="mt-6">
          <BaseButton type="submit" theme="success" :loading="isLoading">
            Сохранить выбор
          </BaseButton>
        </div>
      </form>
      <div class="w-full flex justify-end mt-8">
        <BaseButton theme="destructive" @click="handleLogout"> Выйти из аккаунта </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/base/button/BaseButton.vue'
import BaseCheckboxGroup from '@/components/base/BaseCheckboxGroup.vue'
import { topicsOptions } from '@/models/topics'

const isLoading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const handleSave = () => {
  isLoading.value = true
  authStore.updateTopics(authStore.topics)
  isLoading.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  if (!authStore.user) {
    router.push('/')
  }
})
</script>

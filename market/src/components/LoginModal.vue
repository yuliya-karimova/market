<template>
  <BaseModal
    :is-open="isOpen"
    size="lg"
    @close="close"
    :title="showLogin ? 'Авторизация' : 'Регистрация'"
  >
    <div v-if="showLogin">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Имя пользователя/почта</label>
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            autocomplete="username"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Пароль</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            autocomplete="current-password"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" class="w-full px-3 py-2 bg-blue-500 text-white rounded-md">
          Войти
        </button>
      </form>
      <p v-if="authStore.error" class="text-red-500 mt-4">{{ authStore.error }}</p>
      <div class="mt-8">
        <div class="text-center mb-2">Еще нет аккаунта?</div>
        <button
          @click="showLogin = false"
          class="w-full px-3 py-2 bg-green-500 text-white rounded-md"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>

    <div v-else class="flex flex-col gap-4">
      <BaseButton look="link" theme="white" class="!p-0 max-w-min" @click="showLogin = true">
        <div class="flex gap-2 items-center font-normal">
          <BaseIcon name="outline_arrow_left" size="xs" />
          <span>Назад к форме входа</span>
        </div>
      </BaseButton>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <div>
          <label for="register-username" class="block text-gray-700">Имя пользователя/почта</label>
          <input
            v-model="registerUsername"
            type="text"
            id="register-username"
            name="register-username"
            autocomplete="username"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label for="register-password" class="block text-gray-700">Пароль</label>
          <input
            v-model="registerPassword"
            type="password"
            id="register-password"
            name="new-password"
            autocomplete="new-password"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" class="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded-md">
          Зарегистрироваться
        </button>
      </form>
      <p v-if="authStore.registerError" class="text-red-500 mt-4">
        {{ authStore.registerError }}
      </p>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseIcon from '@/components/base/icon/BaseIcon.vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'

interface Props {
  isOpen?: boolean
}

withDefaults(defineProps<Props>(), {
  isOpen: false
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const username = ref('')
const password = ref('')
const showLogin = ref(true)
const registerUsername = ref('')
const registerPassword = ref('')

const authStore = useAuthStore()
const router = useRouter()

const handleSubmit = async () => {
  await authStore.login(username.value, password.value)
  if (!authStore.error) {
    close()
    router.push('/')
  }
}

const handleRegister = async () => {
  await authStore.register(registerUsername.value, registerPassword.value)
  if (!authStore.registerError) {
    showLogin.value = true
    registerUsername.value = ''
    registerPassword.value = ''
    router.push('/profile')
  }
}
</script>

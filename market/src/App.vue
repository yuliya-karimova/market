<template>
  <header
    class="sticky top-0 flex justify-center items-center h-16 px-4 lg:px-8 bg-white font-mont shadow-sm z-10"
  >
    <nav class="max-w-screen-xl flex gap-6 items-center justify-between w-full">
      <button
        class="sm:hidden flex items-center justify-center h-10 w-6 text-gray-500 rounded-xl hover:text-gray-900 z-10"
        @click="isMobileMenuVisible = !isMobileMenuVisible"
      >
        <BaseIcon name="outline_menu" size="none" title="Open Menu" class="h-6 w-6" />
      </button>
      <div
        v-if="isMobileMenuVisible"
        class="sm:hidden fixed left-0 p-4 top-16 bg-white shadow-sm flex flex-col gap-6 text-md min-w-40"
      >
        <RouterLink
          v-for="item in menu"
          :key="item.to"
          :to="item.to"
          v-slot="{ isActive }"
          @click="isMobileMenuVisible = false"
        >
          <span
            class="hover:text-orange-500 transition duration-150"
            :class="(isActive || isRouteActive(item.to)) && 'text-orange-500'"
          >
            {{ item.title }}
          </span>
        </RouterLink>
      </div>
      <div class="max-sm:hidden flex gap-6 items-center text-md">
        <RouterLink v-for="item in menu" :key="item.to" :to="item.to" v-slot="{ isActive }">
          <span
            class="hover:text-orange-500 transition duration-150"
            :class="(isActive || isRouteActive(item.to)) && 'text-orange-500'"
          >
            {{ item.title }}
          </span>
        </RouterLink>
      </div>
      <BaseButton v-if="!authStore.user" @click="isLoginModalOpen = true"> Войти </BaseButton>
      <RouterLink v-else to="/profile" v-slot="{ isActive }">
        <BaseButton :theme="isActive ? 'secondary' : 'primary'"> Профиль </BaseButton>
      </RouterLink>
    </nav>
  </header>

  <main class="flex justify-center flex-1 py-4 px-4 lg:px-8 bg-gray-100">
    <div class="max-w-screen-xl w-full">
      <RouterView />
    </div>
  </main>

  <LoginModal :is-open="isLoginModalOpen" @close="isLoginModalOpen = false" />

  <footer class="flex justify-center px-4 lg:px-8 py-8 bg-gray-100">
    <div class="max-w-screen-xl w-full">
      <img alt="AI Sisters" class="w-28 h-auto mx-auto" src="/logo_dark.svg" />
    </div>
  </footer>

  <div class="fixed bottom-10 right-10">
    <BaseButton
      theme="secondary"
      rounded="full"
      class="h-14 w-14 !p-0"
      :class="scrollHeight > 10 ? 'opacity-100' : 'opacity-0'"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        />
      </svg>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginModal from '@/components/LoginModal.vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import BaseIcon from '@/components/base/icon/BaseIcon.vue'

const isLoginModalOpen = ref(false)
const authStore = useAuthStore()
const route = useRoute()

const scrollHeight = ref(0)
const isMobileMenuVisible = ref(false)

const menu = [
  { title: 'Главная', to: '/' },
  { title: 'Аналитика', to: '/analytics' },
  { title: 'Новости', to: '/news' },
  // { title: 'FAQ', to: '/faq' }
]

const isRouteActive = (path: string) => {
  return route.path === path || (route.path.startsWith(path) && path !== '/')
}

const updateScroll = () => {
  scrollHeight.value = window.scrollY || document.documentElement.scrollTop
}

const scrollToTop = () => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
}

onMounted(() => {
  authStore.checkAuth()
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

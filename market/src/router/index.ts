import { createRouter, createWebHistory } from 'vue-router'
import CompanyView from '@/views/CompanyView.vue'
import PricesView from '@/views/PricesView.vue'
import MarketView from '@/views/MarketView.vue'
import CompareView from '@/views/CompareView.vue'
import PricesGraphView from '@/views/PricesGraphView.vue'
import PricesPredictView from '@/views/PricesPredictView.vue'
import TalkView from '@/views/TalkView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/AnalyticsView.vue'),
    },
    {
      path: '/analytics/compare',
      name: 'compare',
      component: CompareView
    },
    {
      path: '/analytics/company',
      name: 'company',
      component: CompanyView
    },
    {
      path: '/analytics/market',
      name: 'market',
      component: MarketView
    },
    {
      path: '/analytics/talk',
      name: 'talk',
      component: TalkView
    },
    {
      path: '/analytics/prices',
      name: 'prices',
      component: PricesView
    },
    {
      path: '/analytics/prices-predict',
      name: 'prices-predict',
      component: PricesPredictView
    },
    {
      path: '/analytics/prices-graph',
      name: 'prices-graph',
      component: PricesGraphView
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    // {
    //   path: '/faq',
    //   name: 'faq',
    //   component: () => import('../views/QuestionsView.vue')
    // },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router

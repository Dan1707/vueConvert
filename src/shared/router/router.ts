import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/app/home/view/homeView.vue'
import DashboardView from '@/app/dashboard/view/dashboardView.vue'
import PricingView from '@/app/pricing/view/pricingView.vue'

const routes = [
	{ path: '/', component: HomeView, name: 'home' },
	{ path: '/dashboard', component: DashboardView, name: 'dashboard' },
	{ path: '/pricing', component: PricingView, name: 'pricing' },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

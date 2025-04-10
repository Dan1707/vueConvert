import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/app/home/view/homeView.vue'
import PricingView from '@/app/pricing/view/pricingView.vue'
import MainLayout from '../layouts/mainLayout.vue'
import ConverterView from '@/app/dashboard/view/converterView.vue'

const routes = [
	{
		path: '/',
		name: 'Pablic',
		component: MainLayout,
		children: [
			{ path: '/', component: HomeView, name: 'home' },
			{ path: '/converter', component: ConverterView, name: 'converter' },
			{ path: '/pricing', component: PricingView, name: 'pricing' },
		],
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

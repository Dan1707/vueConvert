<script lang="ts" setup>
import { CodeXml, Puzzle, Zap } from 'lucide-vue-next'
import AdvantItem from '../components/advantItem.vue'
</script>

<template>
	<section class="mt-30">
		<div class="container">
			<h2 class="text-4xl text-center font-bold">
				Why Transform to Composition API?
			</h2>
			<div
				class="flex items-center justify-between gap-3 mt-16 max-lg:flex-col"
			>
				<AdvantItem
					:icon="CodeXml"
					title="Better Code Organization"
					text="Logically group related code together for improved maintainability and readability."
				/>
				<AdvantItem
					:icon="Puzzle"
					title="Better Code Organization"
					text="Extract and reuse component logic with composables for better code sharing."
				/>
				<AdvantItem
					:icon="Zap"
					title="Better Code Organization"
					text="Enjoy improved type inference and better IDE support with Composition API."
				/>
			</div>
		</div>
	</section>
</template>

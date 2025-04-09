<script setup lang="ts">
import Button from '@ui/button/Button.vue'
</script>

<template>
	<header class="border-b-2 sticky top-0 bg-background z-50">
		<div class="container p-6 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<img src="/src/shared/assets/img/logo.svg" alt="logo" />
				<h3 class="text-xl">vueConvert</h3>
			</div>
			<nav class="basis-90">
				<ul class="flex items-center gap-3 justify-between w-full">
					<li>
						<RouterLink :to="{ name: 'home' }">Home</RouterLink>
					</li>
					<li>
						<RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
					</li>
					<li>
						<RouterLink :to="{ name: 'pricing' }">Pricing</RouterLink>
					</li>
				</ul>
			</nav>
			<Button>Get Started</Button>
		</div>
	</header>
</template>

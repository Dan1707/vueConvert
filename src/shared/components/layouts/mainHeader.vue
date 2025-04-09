<script setup lang="ts">
import Button from '@ui/button/Button.vue'
</script>

<template>
	<header class="border-b-2 sticky top-0 bg-background z-50">
		<div class="container p-6 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<img src="/src/shared/assets/img/logo.svg" alt="logo" />
				<h3 class="text-xl font-bold">vueConvert</h3>
			</div>
			<nav class="basis-90 max-lg:hidden">
				<ul class="flex items-center gap-3 justify-between w-full">
					<li>
						<RouterLink :to="{ name: 'home' }" classActive=" text-primary"
							>Home</RouterLink
						>
					</li>
					<li>
						<RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
					</li>
					<li>
						<RouterLink :to="{ name: 'pricing' }">Pricing</RouterLink>
					</li>
				</ul>
			</nav>
			<Button class="max-lg:hidden">Get Started</Button>
			<div class="w-10 h-7 flex-col gap-2 justify-between hidden max-lg:flex">
				<div class="w-full h-1 bg-white rounded-xl"></div>
				<div class="w-full h-1 bg-white rounded-xl"></div>
				<div class="w-full h-1 bg-white rounded-xl"></div>
			</div>
		</div>
	</header>
</template>

<style>
.router-link-exact-active {
	color: var(--color-primary);
}
</style>

<script setup lang="ts">
import Button from '@ui/button/Button.vue'
import { ref } from 'vue'

const showBurgerMenu = ref(false)

const burgerMenuToggle = () => {
	showBurgerMenu.value = !showBurgerMenu.value
	document.body.classList.toggle('overflow-hidden')
}
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
			<div
				class="w-10 h-7 flex-col gap-2 justify-between hidden max-lg:flex"
				@click="burgerMenuToggle"
			>
				<div class="w-full h-1 bg-white rounded-xl"></div>
				<div class="w-full h-1 bg-white rounded-xl"></div>
				<div class="w-full h-1 bg-white rounded-xl"></div>
			</div>
		</div>
	</header>
	<div
		:class="showBurgerMenu ? 'translate-y-0' : 'translate-y-full'"
		class="bg-background w-screen duration-300 min-h-screen z-40 fixed left-[-50%] translate-x-[50%] flex flex-col items-center justify-center"
	>
		<nav>
			<ul class="flex items-center flex-col gap-10 justify-between w-full">
				<li>
					<RouterLink
						:to="{ name: 'home' }"
						class="text-3xl"
						@click="burgerMenuToggle"
						>Home</RouterLink
					>
				</li>
				<li>
					<RouterLink
						:to="{ name: 'dashboard' }"
						class="text-3xl"
						@click="burgerMenuToggle"
						>Dashboard</RouterLink
					>
				</li>
				<li>
					<RouterLink
						:to="{ name: 'pricing' }"
						class="text-3xl"
						@click="burgerMenuToggle"
						>Pricing</RouterLink
					>
				</li>
				<li>
					<Button class="mt-5 text-3xl p-8" @click="burgerMenuToggle"
						>Get Started</Button
					>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style>
.router-link-exact-active {
	color: var(--color-primary);
}
</style>

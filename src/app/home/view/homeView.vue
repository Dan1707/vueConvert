<script lang="ts" setup>
import Button from '@/shared/components/ui/button/Button.vue'
</script>

<template>
	<div class="wrapper">
		<header class="border-b-2">
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
							<RouterLink :to="{ name: 'pricing' }">Pricig</RouterLink>
						</li>
					</ul>
				</nav>
				<Button>Get Started</Button>
			</div>
		</header>
		<main>
			<p>sdfsdf</p>
		</main>
		<footer class="border-t-2">
			<div class="container text-center p-6">
				<p>Al right reserved ©</p>
			</div>
		</footer>
	</div>
</template>

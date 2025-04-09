<script lang="ts" setup>
import mainHeader from '../components/layouts/mainHeader.vue'
import MainFooter from '../components/layouts/mainFooter.vue'
</script>

<template>
	<div class="wrapper">
		<mainHeader />
		<main>
			<RouterView></RouterView>
		</main>
		<MainFooter />
	</div>
</template>

<style>
html,
body {
	min-height: 100%;
}

.wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

main {
	flex: 1 1 auto;
}
</style>

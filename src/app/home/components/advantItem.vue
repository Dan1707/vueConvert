<script lang="ts" setup>
defineProps({
	icon: {
		type: Object,
		required: true,
	},
	title: String,
	text: String,
})
</script>

<template>
	<article
		class="p-5 rounded-xl border max-w-[450px] flex flex-col gap-3 max-lg:max-w-full max-lg:shrink-0"
	>
		<component color="#10b981" :is="icon" />
		<h3 class="text-xl font-bold">{{ title }}</h3>
		<p class="text-slate-500">
			{{ text }}
		</p>
	</article>
</template>

<script lang="ts" setup>
import Button from '@ui/button/Button.vue'
</script>

<template>
	<section class="mt-10">
		<div
			class="container flex items-center justify-between gap-5 max-lg:flex-col max-lg:items-start"
		>
			<div class="max-w-[600px]">
				<h1
					class="text-6xl font-black leading-16 max-md:text-4xl max-md:leading-10"
				>
					Transform Your <span class="text-primary">Vue.js</span> Components
				</h1>
				<p class="mt-8 text-slate-500">
					Seamlessly convert your Vue.js Option API components to the modern
					Composition API with our intelligent transformation tools
				</p>
				<div class="mt-12 flex items-center gap-4">
					<Button>Start Converting</Button>
					<Button variant="transparent"> Learn More </Button>
				</div>
			</div>
			<div
				class="basis-[750px] flex flex-col gap-5 max-lg:flex-row max-lg:basis-auto max-lg:w-full max-lg:mt-10 max-md:flex-col"
			>
				<div
					class="bg-gradient-to-r to-transparent p-5 rounded-xl border w-full"
					style="--tw-gradient-from: #032419"
				>
					<span class="text-primary font-medium">
						// Before: Option API<br
					/></span>
					<code>
						export default {<br />
						&nbsp;&nbsp;data() {<br />
						&nbsp;&nbsp;&nbsp;&nbsp;return {<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count: 0<br />
						&nbsp;&nbsp;&nbsp;&nbsp;}<br />
						&nbsp;&nbsp;},<br />
						&nbsp;&nbsp;methods: {<br />
						&nbsp;&nbsp;&nbsp;&nbsp;increment() {<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.count++<br />
						&nbsp;&nbsp;&nbsp;&nbsp;}<br />
						&nbsp;&nbsp;}<br />
						}
					</code>
				</div>
				<div
					class="bg-gradient-to-r to-transparent p-5 rounded-xl border w-full"
					style="--tw-gradient-from: #032419"
				>
					<span class="text-primary font-medium"
						>// After: Composition API<br
					/></span>
					<code>
						<code>
							<code>
								&lt;script setup lang="ts"&gt;<br />
								&nbsp;&nbsp;import { ref } from 'vue'<br />
								<br />
								&nbsp;&nbsp;const count = ref(0)<br />
								&nbsp;&nbsp;const increment = () => {<br />
								&nbsp;&nbsp;&nbsp;&nbsp;count.value++<br />
								&nbsp;&nbsp;}<br />
								&lt;/script&gt;
							</code>
						</code>
					</code>
				</div>
			</div>
		</div>
	</section>
</template>

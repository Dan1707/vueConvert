<script lang="ts" setup>
import Textarea from '@ui/textarea/Textarea.vue'
import Button from '@ui/button/Button.vue'

import { Copy } from 'lucide-vue-next'
import Label from '@ui/label/Label.vue'
</script>

<template>
	<section class="mt-30">
		<div class="container">
			<h2 class="text-4xl text-center font-bold max-md:text-2xl">
				Try the Converter
			</h2>
			<div class="flex justify-center mt-16 gap-3 max-md:flex-col">
				<div class="basis-[450px] min-h-[300px] relative">
					<Label class="absolute left-0 top-0 p-5 h-[76px]">Option API</Label>
					<Textarea
						placeholder="Place your Option API component here..."
						class="max-w-full min-h-full pt-15 pl-5"
					/>
				</div>
				<div class="basis-[450px] min-h-[300px] relative">
					<div class="flex w-full justify-between absolute p-5">
						<Label>Composition API</Label>
						<Button>
							<Copy />
						</Button>
					</div>
					<Textarea
						placeholder="Converted code will appear here..."
						readonly
						class="max-w-full min-h-full pt-15 pl-5"
					/>
				</div>
			</div>
			<Button class="m-auto block mt-10">Convert Now</Button>
		</div>
	</section>
</template>

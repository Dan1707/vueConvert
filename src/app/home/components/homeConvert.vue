<script lang="ts" setup>
import Textarea from '@ui/textarea/Textarea.vue'
import Button from '@ui/button/Button.vue'

import { Copy } from 'lucide-vue-next'
import Label from '@ui/label/Label.vue'
import { ref } from 'vue'

const optionCode = ref('')
const convertedCode = ref('')

const convertData = (lines: string[]) => {
	let data = ''

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		console.log(line)

		if (line.startsWith('data()')) {
			i++
			while (!lines[i].startsWith('}')) {
				let match = lines[i].match(/(\w+):\s(.+),?/)
				if (match) {
					let [_, key, value] = match

					const isKomma = value[value.length - 1] === ','
					if (isKomma) {
						value = value.slice(0, value.length - 1)
					}

					const isObject =
						value.includes('{') &&
						((value.includes('{') && value.includes('}')) ||
							(value.includes('{') && !value.includes('}')))

					if (isObject && !value.includes('}')) {
						let objectContent = value
						let objectDepth = (value.match(/{/g) || []).length

						i++
						while (i < lines.length && objectDepth > 0) {
							const objLine = lines[i]
							objectContent += ' ' + objLine

							objectDepth += (objLine.match(/{/g) || []).length
							objectDepth -= (objLine.match(/}/g) || []).length

							if (objectDepth > 0) i++
						}

						data += `const ${key} = ref(${objectContent});\n`
					} else {
						data += `const ${key} = ref(${value});\n`
					}
				}
				i++
			}
		}
	}

	convertedCode.value = data
}

const covertCode = (optionCode: string) => {
	const lines = optionCode.split('\n').map(line => line.trim())

	convertData(lines)
}
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
					<code>
						<Textarea
							placeholder="Place your Option API component here..."
							class="max-w-full min-h-full pt-15 pl-5"
							v-model="optionCode"
						/>
					</code>
				</div>
				<div class="basis-[450px] min-h-[300px] relative">
					<div class="flex w-full justify-between absolute p-5">
						<Label>Composition API</Label>
						<Button>
							<Copy />
						</Button>
					</div>
					<code>
						<Textarea
							placeholder="Converted code will appear here..."
							readonly
							class="max-w-full min-h-full pt-15 pl-5"
							v-model="convertedCode"
						/>
					</code>
				</div>
			</div>
			<Button class="m-auto block mt-10" @click="covertCode(optionCode)">
				Convert Now
			</Button>
		</div>
	</section>
</template>

<script lang="ts" setup>
import Textarea from '@ui/textarea/Textarea.vue'
import Button from '@ui/button/Button.vue'

import { Copy } from 'lucide-vue-next'
import Label from '@ui/label/Label.vue'
import { reactive, ref } from 'vue'

const optionCode = ref('')
const convertedCode = ref('')

const converted = reactive({
	data: '',
	functions: '',
	computed: '',
	props: '',
	emits: '',
	imports: '',
	hooks: '',
})

const copyConvertedCode = () => {
	navigator.clipboard.writeText(convertedCode.value || '')
}

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

	converted.data = data
}

const convertFunctions = (lines: string[]) => {
	let data = ''

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		if (line.startsWith('methods:')) {
			i++
			while (lines[i] !== '}') {
				const line = lines[i]
				// CONDITIONS
				const includesBrackets =
					line?.includes('(') ||
					line?.includes(')') ||
					line?.includes('{') ||
					line?.includes('}')

				const includesOthers =
					line?.includes('if(') ||
					line?.includes('switch(') ||
					line?.includes('for(') ||
					line?.includes('console.log') ||
					line?.includes('return') ||
					line?.includes('},')

				let funcObj = {
					funcFirstLine: '',
					funcName: '',
					funcParams: '',
					funcContent: '',
				}

				if (includesBrackets && !includesOthers) {
					const nameMatch = line.match(
						/^\s*(async\s+)?([\w$]+)\s*\(([^)]*)\)\s*{/
					)

					const isAsync = nameMatch?.[1]?.includes('async') ?? false

					if (nameMatch) {
						funcObj.funcName = nameMatch[2] || 'unknown'
						funcObj.funcParams = nameMatch[3]?.trim() || ''
					}

					let funcLines: string[] = []
					let braceCount = 0

					i++

					do {
						const currentLine = lines[i]
						funcLines.push(currentLine)

						braceCount += (currentLine.match(/{/g) || []).length
						braceCount -= (currentLine.match(/}/g) || []).length

						i++
					} while (i < lines.length && braceCount > 0)

					funcObj.funcContent = funcLines.join('\n')

					if (isAsync) {
						data += `\nconst ${funcObj.funcName.trim()} = async(${
							funcObj.funcParams
						}) => {\n${funcObj.funcContent}
}
					`
					} else {
						data += `\nconst ${funcObj.funcName.trim()} = (${
							funcObj.funcParams
						}) => {\n${funcObj.funcContent}
}
					`
					}
				}

				i++
			}
		}
	}

	converted.functions = data
}

const convertComputed = (lines: string[]) => {
	let data = ''
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		if (line.startsWith('computed:')) {
			i++
			while (lines[i] !== '}') {
				const line = lines[i]

				// CONDITIONS
				const includesBrackets =
					line?.includes('(') ||
					line?.includes(')') ||
					line?.includes('{') ||
					line?.includes('}')

				const includesOthers =
					line?.includes('if(') ||
					line?.includes('switch(') ||
					line?.includes('for(') ||
					line?.includes('console.log') ||
					line?.includes('return') ||
					line?.includes('},')

				let funcObj = {
					funcName: '',
					funcParams: '',
					funcContent: '',
				}

				if (includesBrackets && !includesOthers) {
					const nameMatch = line.match(/^(\w+)\s*\(([^)]*)\)/)
					const funcName = nameMatch ? nameMatch[1] : 'unknown'
					const funcParams = nameMatch ? nameMatch[2].trim() : ''

					funcObj.funcName = funcName
					funcObj.funcParams = funcParams

					let funcLines: string[] = []
					let braceCount = 0

					i++

					do {
						const currentLine = lines[i]
						funcLines.push(currentLine)

						braceCount += (currentLine.match(/{/g) || []).length
						braceCount -= (currentLine.match(/}/g) || []).length

						i++
					} while (i < lines.length && braceCount > 0)

					funcObj.funcContent = funcLines.join('\n')

					data += `\nconst ${funcObj.funcName.trim()} = computed((${
						funcObj.funcParams
					}) => {\n	${funcObj.funcContent}
})`
				}

				i++
			}
		}
	}

	converted.computed = data
}

// const findThis = (lines: string[]) => {
// 	for (let i = 0; i < lines.length; i++) {
// 		const line = lines[i]

// 		if (line.startsWith('<script>')) {
// 			i++
// 			while (lines[i] !== '<' + '/script>') {
// 				let line = lines[i]

// 				if (line?.includes('this.')) {
// 					line = line.replace(/this\.(\w+)/g, (_, name) => `${name}.value`)

// 					console.log(line)
// 				}

// 				i++
// 			}
// 		}
// 	}
// }

const convertProps = (lines: string[]) => {
	let data = ''
	const propsLines: string[] = []
	let propsContent = ''

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		if (line.startsWith('props:')) {
			i++
			while (lines[i] !== '},') {
				const currentLine = lines[i]
				propsLines.push(currentLine)
				i++
			}

			propsContent = propsLines.join('\n')
		}
	}

	data = `
const props = defineProps({
${propsContent}
})`

	if (propsContent.length !== 0) {
		converted.props = data
	}
}

const convertEmits = (lines: string[]) => {
	let data = ''
	let emitContent = ''
	const emitLines: string[] = []

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim()

		// Check for emits line
		if (line.startsWith('emits:')) {
			const isArray = line.includes('[')
			const isObject = line.includes('{')

			// Inline array style: emits: ['submit', 'cancel'],
			if ((isArray && line.endsWith('],')) || line.endsWith(']')) {
				emitContent = line.replace('emits:', '').replace(',', '').trim()

				data = `const emit = defineEmits(${emitContent})`
				break
			}

			// Inline object style: emits: { submit: (v) => true },
			if ((isObject && line.endsWith('},')) || line.endsWith('}')) {
				emitContent = line.replace('emits:', '').replace(',', '').trim()

				data = `const emit = defineEmits(${emitContent})`
				break
			}

			// Multiline object or array
			i++
			let braceDepth = 1
			const openingChar = isArray ? '[' : '{'
			const closingChar = isArray ? ']' : '}'

			while (i < lines.length && braceDepth > 0) {
				const currentLine = lines[i]
				emitLines.push(currentLine)

				// Count braces to detect the end
				braceDepth += (
					currentLine.match(new RegExp(`\\${openingChar}`, 'g')) || []
				).length
				braceDepth -= (
					currentLine.match(new RegExp(`\\${closingChar}`, 'g')) || []
				).length

				i++
			}

			emitContent = emitLines.join('\n')
			data = `const emit = defineEmits(${openingChar}\n${emitContent}\n${closingChar})`
			break
		}
	}

	if (emitContent.length !== 0) {
		converted.emits = data
	}
}

const convertImports = (lines: string[]) => {
	const importLines: string[] = []

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].trim()
		const isImport = line.includes('import') && line.includes('from')
		const isLongImport = line.includes('import') && line.endsWith('{')

		if (isLongImport) {
			let importBlock = line
			i++

			while (i < lines.length && !lines[i].includes('from')) {
				importBlock += '\n' + lines[i]
				i++
			}

			if (i < lines.length) {
				importBlock += '\n' + lines[i]
			}

			importLines.push(importBlock)
		} else if (isImport) {
			importLines.push(lines[i])
		}
	}

	converted.imports = importLines.join('\n')
}

const convertHooks = (lines: string[]) => {
	interface hookObj {
		option: string
		composition: string | null
	}

	const hooksArr: hookObj[] = [
		{ option: 'beforeCreate', composition: null },
		{ option: 'created', composition: null },
		{ option: 'beforeMount', composition: 'onBeforeMount' },
		{ option: 'mounted', composition: 'onMounted' },
		{ option: 'beforeUpdate', composition: 'onBeforeUpdate' },
		{ option: 'updated', composition: 'onUpdated' },
		{ option: 'beforeUnmount', composition: 'onBeforeUnmount' },
		{ option: 'unmounted', composition: 'onUnmounted' },
		{ option: 'activated', composition: 'onActivated' },
		{ option: 'deactivated', composition: 'onDeactivated' },
		{ option: 'errorCaptured', composition: 'onErrorCaptured' },
		{ option: 'renderTracked', composition: 'onRenderTracked' },
		{ option: 'renderTriggered', composition: 'onRenderTriggered' },
		{ option: 'serverPrefetch', composition: 'onServerPrefetch' },
	]

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].trim()
		if (!line) continue

		for (const hook of hooksArr) {
			if (line.startsWith(hook.option)) {
				const compositionVer = hook.composition

				const paramStart = line.indexOf('(')
				const paramEnd = line.indexOf(')')
				const hookParams = line.slice(paramStart, paramEnd)

				if (!compositionVer) break

				const hookContent: string[] = []
				i++

				while (i < lines.length && !lines[i].trim().startsWith('}')) {
					hookContent.push(lines[i].trim())
					i++
				}

				converted.hooks += `
${compositionVer}((${hookParams}) => {
	${hookContent.join('\n\t')}
})
`

				break
			}
		}
	}
}

const covertCode = (optionCode: string) => {
	const lines = optionCode.split('\n').map(line => line.trim())

	convertData(lines)
	convertFunctions(lines)
	convertComputed(lines)
	convertProps(lines)
	convertEmits(lines)
	convertImports(lines)
	convertHooks(lines)

	convertedCode.value =
		`<script>
${converted.imports}
${converted.props}
${converted.emits}
${converted.data}
${converted.functions}
${converted.computed}
${converted.hooks}
` + `${'</' + 'script>'}`
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
						<Button @click="copyConvertedCode()">
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

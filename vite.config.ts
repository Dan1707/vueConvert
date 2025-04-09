import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [vue(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/shared/components'),
			'@composables': path.resolve(__dirname, './src/shared/composables'),
			'@utils': path.resolve(__dirname, './src/shared/lib/utils'),
			'@ui': path.resolve(__dirname, './src/shared/components/ui'),
			'@lib': path.resolve(__dirname, './src/shared/lib'),
		},
	},
})

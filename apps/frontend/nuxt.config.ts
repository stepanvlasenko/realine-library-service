import path from 'path'

export default defineNuxtConfig({
    css: [
        '@/assets/styles/index.scss',
    ],

    nitro: {
        preset: 'netlify',
    },

    alias: {
        '@types': path.join(__dirname, 'assets', 'ts', 'types.ts'),
    },
})

import path from 'path'

export default defineNuxtConfig({
    nitro: {
        preset: 'netlify',
    },
    alias: {
        '@types': path.join(__dirname, 'assets', 'ts', 'types.ts')
    }
})

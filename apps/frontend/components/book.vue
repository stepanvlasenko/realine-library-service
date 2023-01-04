<script setup lang="ts">
import type { PropType } from 'vue'

import type { IBook, Variant } from '@types'

defineProps({
    variant: {
        type: String as PropType<Variant>,
        required: true,
    },
    book: {
        type: Object as PropType<IBook>,
        required: true,
    },
})
</script>

<template>
    <div />
</template>

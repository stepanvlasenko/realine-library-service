<template>
    <div>
        
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Variant, IBook } from '@types'

defineProps({
    variant: {
        type: String as PropType<Variant>,
        required: true
    },
    book: {
        type: Object as PropType<IBook>,
        required: true
    }
})
</script>
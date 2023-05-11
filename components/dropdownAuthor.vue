<script setup lang="ts">
import { PropType } from 'vue'
import { IAuthor, IBook } from '@types'
import { useAuthors } from '~/stores/authors'

const { author } = defineProps({
    author: {
        type: Object as PropType<IAuthor>,
        required: true,
    }
})

const emit = defineEmits(['linkClicked'])
const onLinkClicked = () => emit('linkClicked')


</script>

<template>

</template>

<style scoped lang="scss">
@use '@/assets/styles/index.scss' as styles;
</style>
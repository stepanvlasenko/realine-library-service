<script setup lang="ts">
import { PropType } from 'vue'
import { IAuthor } from '@types';

const { author } = defineProps({
    author: {
        type: Object as PropType<IAuthor>,
        required: true,
    }
})

const emit = defineEmits(['linkClicked'])
const onLinkClicked = () => emit('linkClicked')

const getFullName = (author: IAuthor): string => {
        if (author.secondName)
            return `${author.name} ${author.secondName} ${author.surname}`
        return `${author.name} ${author.surname}`
    }
</script>

<template>
    <input type="radio" :id="author.id" :value="author.id">
    <label class="option__text" :for="author.id">{{ getFullName(author) }}</label>
</template>

<style scoped lang="scss">
@use '@/assets/styles/index.scss' as styles;
.option {
    &__text {
        color: map-get($map: styles.$colors, $key: gray-light);
    }
}
</style>

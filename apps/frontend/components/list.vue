<script setup lang="ts">
import type { PropType } from 'vue'
import type { IBook, ListVariant } from '@types'

defineProps({
    books: {
        type: Array<IBook>,
        required: true,
    },
    title: {
        type: String,
        required: false,
        default: '',
    },
    variant: {
        type: String as PropType<ListVariant>,
        required: true,
    },
})
</script>

<template>
    <!-- Недоделано, но хочу пользоваться настроенными брекпойнтами -->
    <div class="list">
        <h2 v-if="title" class="list__title">
            {{ title }}
        </h2>
        <div class="list__items" :class="`list__items--${variant}`">
            <Book
                v-for="book of books"
                :key="book.ID"
                :book="book"
                variant="small"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.list__items {
    display: flex;
    flex-direction: row;
    &--list {
        flex-wrap: wrap;
    }
}
</style>

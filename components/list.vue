<script setup lang="ts">
import type { PropType } from 'vue'
import type { IBook, ListVariant } from '@types'

const { books } = defineProps({
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

const itemsInRow = computed(() => {
    return books.length > 2 ? 3 : books.length
})
</script>

<template>
    <div>
        <h2 v-if="title" class="title">
            {{ title }}
        </h2>
        <BookSwiper v-if="variant === 'slider'" :books="books" :items-in-row="itemsInRow" />

        <div v-if="variant === 'list'" class="list">
            <div
                v-for="book of books"
                :key="book.id"
                class="list__item"
            >
                <Book
                    :book="book"
                    variant="small"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    &__item {
        width: 30%
    }
}
</style>

<script setup lang="ts">
import { PropType } from 'vue';
import { IBook } from '@types';

    defineProps({
        books: {
            type: Object as PropType<IBook[]>,
            required: true
        }
    })
</script>

<template>
    <div class="dropdown">
        <DropdownBook v-for="book in books" :key="book.id" :book="book"/>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/index.scss' as styles;
    .dropdown {
        background-color: map-get(styles.$colors, black);
        border-radius: 10px 20px 5px 40px;

        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>
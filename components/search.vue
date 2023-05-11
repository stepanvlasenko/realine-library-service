<script lang="ts" setup>
import { IBook } from '@types';
import { useBookSearch } from '@/compasables/useSearch'

const bookSearch = useBookSearch()

const searchRequest = ref('')
const searchedBooks = ref<IBook[]>([])

const isOpened = ref(false)
const changeSearchState = () => {
    isOpened.value = !isOpened.value
}

const onLinkClicked = () => {
    searchRequest.value = ''
    searchedBooks.value = []
}

debouncedWatch(searchRequest, async () => {
    searchedBooks.value = await bookSearch.searchBooks(searchRequest.value)
}, {
    debounce: 300,
})
</script>

<template>
    <div class="container">
        <div class="search">
            <div class="search__icon" :class="{ 'search__icon--right': isOpened }" @click="changeSearchState">
                <NuxtIcon name="search" filled class="icon" />
            </div>
            <input v-if="isOpened" v-model="searchRequest" class="search__input" type="text">
        </div>
        <Dropdown @link-clicked="onLinkClicked" class="result" :books="searchedBooks"/>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;
.search {
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    &__icon {
        background-color: map-get(styles.$colors, 'header-bg-color');
        aspect-ratio: 1/1;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        &--right {
            position: absolute;
            right: 0
        }
    }

    &__input {
        background-color: map-get(styles.$colors, 'header-bg-color');
        color: map-get(styles.$colors, gray);
        border: none;
        border-radius: 40px;
        width: 100%;
        padding: 2px calc(6px + 36px) 2px 6px;
        font-size: 16px;
        line-height: 1;
        height: inherit;
    }
    &__input:focus {
        outline: none;
    }
}
.container {
    position: relative;
}
.result {
    position: absolute;
}
</style>

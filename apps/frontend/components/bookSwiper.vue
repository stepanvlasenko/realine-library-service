<script setup lang="ts">
import type { Book } from '@types'
import { useSwiper } from '@/compasables/useSwiper'

const props = withDefaults(defineProps<{
    books: Book[]
    itemsInRow?: number
}>(), {
    itemsInRow: 1,
})

const books = toRef(props, 'books')

const itemsInRow = toRef(props, 'itemsInRow')

const slidesRef = ref<HTMLElement>()

const {
    current,
    firstSlideIndex,
    lastSlideIndex,
    visibleSlides,
    selectNextSlide,
    selectPrevSlide,
} = useSwiper(books.value.length, itemsInRow)

const visibleBooks = computed<Map<Book, boolean>>(() => {
    return new Map<Book, boolean>(books.value.map((book, index) => {
        return [book, visibleSlides.value.includes(index)]
    }))
})

useSwipe(slidesRef, {
    onSwipeEnd: (_event, direction) => {
        if (direction === 'RIGHT')
            selectPrevSlide()
        else if (direction === 'LEFT')
            selectNextSlide()
    },
})
</script>

<template>
    <div class="swiper">
        <div class="swiper__wrapper">
            <button
                class="swiper__chevron left"
                :disabled="current === firstSlideIndex"
                @click="selectPrevSlide"
            >
                <NuxtIcon name="chevron" />
            </button>
            <div ref="slidesRef" class="swiper__slides">
                <template
                    v-for="(book, index) in books"
                    :key="index"
                >
                    <Book
                        v-if="visibleBooks.get(book)"
                        :book="book"
                        variant="small"
                    />
                </template>
            </div>
            <button
                class="swiper__chevron right"
                :disabled="current === lastSlideIndex"
                @click="selectNextSlide"
            >
                <NuxtIcon name="chevron" />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/index.scss' as styles;
.swiper {
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__chevron {
        color: map-get(styles.$colors, white);
        border: none;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        &.left {
            transform: rotate(90deg);
        }
        &.right {
            transform: rotate(-90deg);
        }
    }
    &__slides {
        overflow-x: clip;
        flex: 1 0 0;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        & > * {
            flex: 1 0 0;
        }
    }
}
</style>

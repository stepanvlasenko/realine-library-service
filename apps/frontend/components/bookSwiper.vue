<script setup lang="ts">
import type { IBook } from '@types'
import { useSwiper } from '@/compasables/useSwiper'

const props = withDefaults(defineProps<{
    books: IBook[]
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
    slides,
    selectNextSlide,
    selectPrevSlide,
} = useSwiper(books.value.length, itemsInRow)

const visibleBooks = computed<Map<IBook, boolean>>(() => {
    return new Map<IBook, boolean>(books.value.map((book, index) => {
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
                    <KeepAlive>
                        <Book
                            v-if="visibleBooks.get(book)"
                            :book="book"
                            variant="small"
                        />
                    </KeepAlive>
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
.swiper {
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__chevron {
        border: none;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        @include typo(body-1-normal);
        &.left {
            transform: rotate(90deg);
        }
        &.right {
            transform: rotate(-90deg);
        }
    }
    &__slides {
        overflow-x: clip;
        padding: rem(12px);
        flex: 1 0 0;
        display: flex;
        align-items: flex-start;
        gap: rem(48px);
        & > * {
            flex: 1 0 0;
        }
    }
}
</style>

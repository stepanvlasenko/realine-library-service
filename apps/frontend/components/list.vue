<script setup lang="ts">
import type { PropType } from 'vue'
import type { IBook, ListVariant } from '@types'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import 'swiper/css'

const props = defineProps({
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
    <div>
        <h2 v-if="title" class="title">
            {{ title }}
        </h2>
        <!-- <Swiper
            v-if="variant === 'slider'"
            :grab-cursor="true"
            :space-between="12"
            :slides-per-view="3"
        >
            <SwiperSlide
                v-for="book of books"
                :key="book.ID"
            >
                <Book
                    :book="book"
                    variant="small"
                />
            </SwiperSlide>
        </Swiper> -->
        <b-form-slider />
        <div v-if="variant === 'list'" class="list">
            <div
                v-for="book of books"
                :key="book.ID"
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

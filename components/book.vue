<script setup lang="ts">
import type { PropType } from 'vue'

import type { BookVariant, IBook } from '@types'

defineProps({
    variant: {
        type: String as PropType<BookVariant>,
        required: true,
    },
    book: {
        type: Object as PropType<IBook>,
        required: true,
    },
})

/**
 * adds '...' in the end of description
 * @param desc description of Book
 * @param nOfSymbols length of description
 */
const formatDescription = (desc: string, nOfSymbols: number): string => {
    const arr = desc.split('')
    const formated = desc.length > nOfSymbols ? `${arr.slice(0, nOfSymbols - 3).join('')}...` : desc
    return formated
}
</script>

<template>
    <div v-if="variant === 'small'" :class="`book--${variant}`">
        <div class="book__image-wrapper">
            <img class="book__image" :src="book.coverImageURL">
            <div class="book__rating">
                <Rating :rating="book.rating" />
            </div>
        </div>
        <p href="#" class="book__link">
            {{ book.name }}
        </p>
    </div>

    <div v-if="variant === 'vertical'" :class="`book--${variant}`">
        <div class="book__image-wrapper">
            <img class="book__image" :src="book.coverImageURL">
        </div>
        <div class="book__content">
            <h2 class="book__name">{{ book.name }}</h2>
            <p class="book__description">{{ formatDescription(book.description, 100) }}</p>
            <div class="book__details">
                <Rating :rating="book.rating" />
                <BaseLink text="Подробнее" :url="`/book/${book.id}`"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '@/assets/styles/index.scss' as styles;
    p {
        margin: 0;
        padding: 0;
        @include styles.typography('body-3');
        color: map-get(styles.$colors, white);
        text-decoration: none;
    }
    .book {
        &--small {
            background: map-get(styles.$colors, black-dim);
            width: 100%;
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
            border-radius: 10px 20px 10px 10px;
            padding-left: 10px;
            padding-bottom: 10px;
        }
        &--small &__image {
            width: 100%;
            height: 100%;
            border-radius: 10px 20px 5px 40px;
        }
        &--small &__image-wrapper {
            flex: 1;
            width: 100%;
            aspect-ratio: 3/4;
            position: relative;
        }
        &--small &__rating {
            background: map-get(styles.$colors, black-dim);
            position: absolute;
            bottom: 0;
            right: 0;

            padding: 5px;
            padding-left: 8px;

            border-top-left-radius: 16px;
            border-top-right-radius: 4px;
        }
        &--small &__link {
            @include styles.typography('body-2')
        }
        &--vertical {
            position: relative
        }
        &--vertical &__image {
            width: 80%;
            height: 100%;
            aspect-ratio: 3/4;
            border-radius: 16px;
            margin: auto;
        }
        &--vertical &__image-wrapper {
            display: flex;
            justify-content: center;
            flex: 1;
            width: 100%;
            top: 0;
            padding-bottom: 50px;
            z-index: 0;
        }
        &--vertical &__content {
            background: map-get(styles.$colors, black-dim);
            box-shadow: 0px -8px 12px rgba(0, 0, 0, 0.25);
            border-radius: 16px;
            width: 100%;
            padding: 10px;
            position: absolute;
            bottom: 0;
            z-index: 1;
            display: grid;
            gap: 5px;
        }
        &--vertical &__description {
            color: map-get(styles.$colors, gray);
            @include styles.typography('body-mono-2')
        }
        &--vertical &__details {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>

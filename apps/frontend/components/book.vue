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
            Книга
        </p>
    </div>
</template>

<style scoped lang="scss">
    p {
        margin: 0;
        padding: 0;
        color: #fff;
        text-decoration: none;
    }
    .book {
        &--small {
            background: #232329;
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
            padding-left: px;
            position: relative;
        }
        &--small &__rating {
            background: #232329;
            position: absolute;
            bottom: 0;
            right: 0;

            padding: 5px;
            padding-left: 8px;

            border-top-left-radius: 16px;
            border-top-right-radius: 4px;
        }
        &--small &__link {
            font-size: 1.5rem;
        }
    }
</style>

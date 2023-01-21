<script setup lang="ts">
import type { PropType } from 'vue'

import type { IBook, Variant } from '@types'

defineProps({
    variant: {
        type: String as PropType<Variant>,
        required: true,
    },
    book: {
        type: Object as PropType<IBook>,
        required: true,
    },
})
</script>

<template>
    <div v-if="variant == 'small'" class="book--small">
        <div class="book__image--wrapper--small">
            <img class="book__image--small" :src="book.coverImageURL">
            <div class="book__rating--small">
                <!-- ЗДЕСЬ НЕ ВЫЧИСЛЯЕТСЯ РЕЙТИНГ (ОН ПРОСТО ДЛЯ ПРИМЕРА) -->
                <Rating :rating="4.5"></Rating>
            </div>
        </div>
        <a href="#" class="book__link--small">Книга</a>
    </div>
</template>

<style scoped lang="scss">
    a {
        color: #fff;
        text-decoration: none;
    }
    .book {
        &--small {
            background: #232329;
            width: 30%;
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            border-radius: 10px 20px 10px 10px;
        }
        &__image {
            &--small {
                width: 100%;
                height: 100%;
                border-radius: 10px 20px 5px 40px;
            }
            &--wrapper {
                &--small {
                    flex: 1;
                    margin-left: 0.5rem;
                    position: relative;
                }
            }
        }
        &__rating {
            &--small {
                background: #232329;
                position: absolute;
                bottom: 0;
                right: 0;

                padding: 5px;
                padding-left: 8px;

                border-top-left-radius: 16px;
                border-top-right-radius: 4px;
            }
        }
        &__link {
            &--small {
                font-size: 1.5rem;
            }
        }
    }
</style>
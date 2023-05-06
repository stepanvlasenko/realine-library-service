<script setup lang="ts">
import { PropType } from 'vue'
import { IBook } from '@types'
import { useAuthors } from '~/stores/authors'
import { useClientLinks } from '~/compasables/useClientLinks';

const { book } = defineProps({
    book: {
        type: Object as PropType<IBook>,
        required: true,
    }
})

const emit = defineEmits(['linkClicked'])
const onLinkClicked = () => emit('linkClicked')

const author = await useAuthors().getAuthorById(book.authorId)
</script>

<template>
    <!-- Мб будет лучше добавить кнопку-ссылку вида "подробнее" -->
    <div class="book">
        <!-- Враппер на 4 пикселя вылезает за границы компонента. Проблема -->
        <div class="book__image-wrapper">
            <img class="book__image" :src="book.coverImageURL">
        </div>
        <div class="book__info">
            <h2>{{ book.name }}</h2>
            <p class="info__author">{{ author.getFullName() }}</p>
            <div class="info__details">
                <Rating :rating="book.rating" />
                <BaseLink @clicked="onLinkClicked" text="Подробнее" :url="`/book/${book.id}`"/>
            </div>
            
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/index.scss' as styles;

.book {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 8px;
    

    background-color: map-get(styles.$colors, black-dim);
    border-radius: 10px 20px 5px 40px;

    &__image-wrapper {
        aspect-ratio: 3/4;
    }

    &__image {
        width: 100%;
        height: 100%;
        border-radius: 10px 20px 5px 40px;
    }

    &__info {
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
.info {
    &__author {
        margin: 0;
        padding: 0;

        color: map-get(styles.$colors, gray);
        @include styles.typography('body-mono-2')
    }
    &__details {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>
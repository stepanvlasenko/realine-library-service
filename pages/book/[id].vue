<script lang="ts" setup>
import { useGenres } from '~/stores/genres'
import { useAuthors } from '../../stores/authors'
import { useBooks } from '../../stores/books'

const bookId = '' + useRoute().params.id

const book = await useBooks().getBookById(bookId)
const author = await useAuthors().getAuthorById(book.authorId)
const similarBooks = await useBooks().fetchSimilarBooksById(book.id)

const anotherBooksIdsByThisAuthor = (await useAuthors().getOwnedBooksIds(author.id)).filter(v => v !== book.id)
const anotherBooksByThisAuthor = anotherBooksIdsByThisAuthor.length ? await useBooks().getBooksByIds(anotherBooksIdsByThisAuthor) : []

const genres = useGenres().getGenres().map(v => book.genresIds.includes(v.id) ? v.name : null).filter(v => v !== null).join(', ')

// const formatCreatedDate = (rawDate: Date): string => {
//     const date: Date = new Date(rawDate)
//     return `${date.getFullYear()}`
// }
</script>

<template>
    <div class="page">
        <div class="legend">
            <div class="legend__image-wrapper">
                <img class="legend__image" :src="book.coverImageURL">
            </div>
            <div class="legend__container">
                <div class="legend__bio">
                    <h2>
                        {{ book.name }} 
                        <!-- ({{ formatCreatedDate(book.createdAt) }}) -->
                    </h2>
                    <h3>{{ author.getFullName() }}</h3>
                    <p class="bio__genre">{{ genres }}</p>
                    <Rating :rating="book.rating" />
                </div>
                <hr>
                <div class="legend__description">{{ book.description }}</div>
            </div>
        </div>
        <div class="read">
            <BaseLink class="read__link" text="Читать" :url="`/book/${book.id}`" />
        </div>
        <div class="another">
            <List v-if="similarBooks.length" title="Похожие книги" :books="similarBooks" variant="slider" />
            <List v-if="anotherBooksByThisAuthor.length" title="Другие книги этого автора" :books="anotherBooksByThisAuthor" variant="slider" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;
.page {
    background-color: map-get(styles.$colors, black);
    display: flex;
    flex-direction: column;
    gap: 4px;
}
hr {
    margin: 0;
    padding: 0;
    width: 98%;
    border: none;
    height: 1px;
    background: map-get(styles.$colors, gray);
}
.legend {
    display: grid;
    gap: 4px;
    &__image-wrapper {
        padding: 0 5% 10%;

    }
    &__image {
        aspect-ratio: 3/4;
        border-radius: 16px;
        width: 100%;
    }
    &__bio {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    &__bio > * {
        margin: 0;
        padding: 0;
    }
    &__description {
        @include styles.typography('body-mono-2');
        color: map-get(styles.$colors, gray);
    }
}
.bio {
    &__genre {
        @include styles.typography('body-mono-2');
        color: map-get(styles.$colors, gray);
    }
}
.read__link {
    display: flex;
    width: fit-content;
    margin-left: auto;
}
.another {
    display: flex;
    flex-direction: column;
    gap: 32px;
}
@media all and (min-width: styles.$DESKTOP_BREAKPOINT) {
    .legend {
        grid-template-columns: 3fr 5fr;
    }
}
</style>

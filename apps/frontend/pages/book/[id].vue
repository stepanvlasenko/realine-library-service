<script lang="ts" setup>
import type { IBook } from '@types'
import { useAuthors } from '../../stores/authors'
import { useBooks } from '../../stores/books'

const thisBookID = +useRoute().params.id

// const book: IBook = await useBooks().getBookByID(thisBookID)
const book: IBook = {
    ID: 0,
    name: 'Name',
    ISBN: 'ISBN',
    authorID: 0,
    publisherID: 0,
    description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
    genresID: [0, 1, 2],
    reviewsID: [0, 1, 2],
    rating: 4.5,
    coverImageURL: '/images/test-book.jpg',
    keywords: ['book'],
    publishDate: new Date(0),
    fileURL: 'string',
    createdAt: new Date(0),
    updatedAt: new Date(0),
}
const author = await useAuthors().getAuthorByID(book.authorID)
const genres = 'abc def ghi'

const similarBooks: IBook[] = []
const anotherBooksByThisAuthor: IBook[] = []
for (let i = 0; i < 5; i++) {
    similarBooks.push({
        ID: 0,
        name: 'Name',
        ISBN: 'ISBN',
        authorID: 0,
        publisherID: 0,
        description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
        genresID: [0, 1, 2],
        reviewsID: [0, 1, 2],
        rating: 4.5,
        coverImageURL: '/images/test-book.jpg',
        keywords: ['book'],
        publishDate: new Date(0),
        fileURL: 'string',
        createdAt: new Date(0),
        updatedAt: new Date(0),
    })
    anotherBooksByThisAuthor.push({
        ID: 0,
        name: 'Name',
        ISBN: 'ISBN',
        authorID: 0,
        publisherID: 0,
        description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
        genresID: [0, 1, 2],
        reviewsID: [0, 1, 2],
        rating: 4.5,
        coverImageURL: '/images/test-book.jpg',
        keywords: ['book'],
        publishDate: new Date(0),
        fileURL: 'string',
        createdAt: new Date(0),
        updatedAt: new Date(0),
    })
}

const formatCreatedDate = (rawDate: Date): string => {
    const date: Date = new Date(rawDate)
    return `${date.getFullYear()}`
}
// Не делай этого...
// const similarBooks = await useBooks().fetchSimilarBooksByBook(book)
// const anotherBooksByThisAuthor = useBooks().getBooksByAuthorID(author.ID)
</script>

<template>
    <div class="page">
        <div class="legend">
            <div class="legend__image-wrapper">
                <img class="legend__image" :src="book.coverImageURL">
            </div>
            <div class="legend__container">
                <div class="legend__bio">
                    <h2>{{ book.name }} ({{ formatCreatedDate(book.createdAt) }})</h2>
                    <h3>{{ author.getFullName() }}</h3>
                    <p class="bio__genre">{{ genres }}</p>
                    <Rating :rating="book.rating" />
                </div>
                <hr>
                <div class="legend__description">{{ book.description }}</div>
            </div>
        </div>
        <div class="read">
            <BaseLink class="read__link" text="Читать" :url="`/book/${book.ID}`" />
        </div>
        <div class="another">
            <List title="Похожие книги" :books="similarBooks" variant="slider" />
            <List title="Другие книги этого автора" :books="anotherBooksByThisAuthor" variant="slider" />
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
        padding-right: 10%;
        padding-bottom: 10%;
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

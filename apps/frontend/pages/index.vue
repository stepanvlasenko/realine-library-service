<script setup lang="ts">
import type { IBook } from '@types'

const myBook: IBook = {
    ID: 0,
    name: 'name',
    ISBN: 'ISBN',
    authorID: 0,
    publisherID: 0,
    description: 'description',
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
</script>

<template>
    <div>
        <BaseLink text="Юзер" url="/user/0" />
        <BaseLink text="Книга" url="/book/0" />
    </div>
</template>

<style scoped>
.test {
    width: 200px;
    height: 300px;
}
.test2 {
    width: 120px;
    height: 120px;
    background-color: black;
}
</style>

<script setup lang="ts">
import type { IBook, IUser } from '@types'

const myBook: IBook = {
    ID: 0,
    name: 'Name',
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

const user: IUser = {
    ID: 0,
    role: 'user',
    username: 'Username',
    birthday: new Date(0),
    avatarURL: '/images/test-book.jpg',
    email: 'Reyden732@gmail.com',
    interests: ['horror', 'fantasy'],
    readedBooksID: [0, 1, 2],
    favoritesID: [0, 1, 2],
    createdAt: new Date(0),
    updatedAt: new Date(0),
}
</script>

<template>
    <div class="page">
        <div class="legend">
            <Avatar :avatar-u-r-l="user.avatarURL" variant="bordered" />
            <div class="bio">
                <h2 class="bio__username">{{ user.username }}</h2>
                <p class="bio__birthday">{{ user.birthday }}</p>
            </div>
            <List title="Прочитанные книги" variant="changeable" :books="[myBook, myBook, myBook]" />
        </div>
        <div class="favorite">
            <List title="Любимые книги" variant="changeable" :books="[myBook, myBook, myBook]" />
            <h2>Любимая книга</h2>
            <Book variant="vertical" :book="myBook" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media all and (max-width: 768px) {
    .legend {
        display: grid;
        grid-template-columns: 1fr;
    }
}
</style>

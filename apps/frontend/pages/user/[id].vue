<script setup lang="ts">
import type { IBook, IUser, ListVariant } from '@types'
import { useScssBreakpoints } from '@/compasables/useScssBreakpoints'

const books: IBook[] = []
for (let i = 0; i < 5; i++) {
    books.push({
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
const breakpoints = useScssBreakpoints()

const listVariant = computed<ListVariant>(() => {
    const isDesktop = breakpoints.desktop.value

    return isDesktop ? 'list' : 'slider'
})

const formatBirthday = (date: Date): string => `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
</script>

<template>
    <div class="page">
        <div class="legend">
            <div class="legend__avatar">
                <Avatar :avatar-u-r-l="user.avatarURL" variant="bordered" />
            </div>
            <div class="legend__container">
                <div class="legend__bio bio">
                    <h2 class="bio__username">{{ user.username }}</h2>
                    <p class="bio__birthday">{{ formatBirthday(user.birthday) }}</p>
                </div>
                <hr color="grey">
                <List title="Прочитанные книги" variant="slider" :books="books" />
            </div>
        </div>
        <div class="favorite">
            <div class="favorite__book">
                <h2>Любимая книга</h2>
                <Book variant="vertical" :book="books[0]" />
            </div>
            <ClientOnly>
                <List title="Любимые книги" :variant="listVariant" :books="books" />
            </ClientOnly>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;
.page {
    background-color: map-get(styles.$colors, black);
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
    &__avatar {
        width: 100%;
        margin: auto;
        padding: 10px;
    }
    &__container {
        display: grid;
        gap: 4px;
    }
}
.favorite {
    display: grid;
    gap: 30px;
}
.bio {
    &__birthday {
        color: map-get(styles.$colors, gray);
        margin: 0;
        padding: 0;
    }
}
@media all and (min-width: styles.$DESKTOP_BREAKPOINT) {
    .legend {
        grid-template-columns: 3fr 5fr;
    }
    .favorite {
        grid-template-columns: 3fr 5fr;
    }
}
@media all and (max-width: styles.$DESKTOP_BREAKPOINT) {
    .legend{
        &__avatar {
            max-width: 20rem;
        }
    }
}
</style>

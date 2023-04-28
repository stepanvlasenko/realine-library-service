<script setup lang="ts">
import { useBooks } from '~/stores/books';
// const res = await useBooks().getBookById('clgb9dzhg0000vpqw6a6fmi1j')
const res = await useBooks().createBook({
    name: 'fjsdlkfj',
    authorId: 'sdfasd',
    description: 'fdsdfdsfsdf',
    genresIds: ['1'],
    coverImage: new File([], 'dsdf'),
    file: new File([], 'dfsdf'),
})
// console.log(res)
</script>

<template>
    <div>
        <!-- <DropdownBook :book="res"/> -->
        <!-- <BaseLink text="Юзер" url="/user/0" />
        <BaseLink text="Книга" url="/book/0" /> -->
    </div>
</template>

<style scoped>
.test {
    width: 400px;
    height: 300px;
}
.test2 {
    width: 120px;
    height: 120px;
    background-color: black;
}
</style>
''

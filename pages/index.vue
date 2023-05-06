<script setup lang="ts">
import { useBooks } from '~/stores/books';
import { Buffer } from 'buffer'
import { useFiles } from '~/compasables/useFiles';

// const res = await useBooks().getBookById('clgb9dzhg0000vpqw6a6fmi1j')
// const res = await useBooks().createBook({
//     name: 'fjsdlkfj',
//     authorId: 'sdfasd',
//     description: 'fdsdfdsfsdf',
//     genresIds: ['1'],
//     coverImage: new File([], 'dsdf'),
//     file: new File([], 'dfsdf'),
// })
// console.log(res)
const coverImage = ref<File | null>(null)
const coverImageInput = ref(null)
const onCoverImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target && target.files) {
        coverImage.value = target.files[0]
    }
}
watch(coverImage, async () => {
    console.log(Buffer.from(await new Blob([coverImage.value!]).arrayBuffer()))
    $fetch('/api/test/**', {
        body: {
            image: await useFiles().fileToBuffer(coverImage.value!)
        },
        method: 'POST'
    })
})
</script>

<template>
    <div>
        <input type="file" id="coverImageInput" ref="coverImageInput" @change="onCoverImageChange" accept=".png, .jpg, .jpeg, .svg">
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

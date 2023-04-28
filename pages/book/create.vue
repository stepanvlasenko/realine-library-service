<script setup lang="ts">
import { useGenres } from '../../stores/genres'
import { useBooks } from '~/stores/books';

const genres = useGenres().getGenres()

const name = ref<string | null>(null)
const authorId = ref<string | null>(null)
const description = ref<string | null>(null)
const genresIds = ref<string[]>([])
const coverImage = ref<File | null>(null)
const file = ref<File | null>(null)

const agreeToPublish = ref(false)
const confirmOwnership = ref(false)

const coverImageInput = ref(null)
const onCoverImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target && target.files) {
        coverImage.value = target.files[0]
    }
}

const coverImagefileInput = ref(null)
const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target && target.files) {
        file.value = target.files[0]
    }
}

const areValuesCorrect = ref(true)
const checkValues = (): boolean => {
    if (!name.value || !authorId.value || !description.value ||
    genresIds.value.length === 0 ||
    !coverImage.value || !file.value ||
    !agreeToPublish.value || !confirmOwnership.value)  {
        areValuesCorrect.value = false
        return false
    }
    areValuesCorrect.value = true
    return true
}

const isAccepted = ref(false)
const onSubmit = (event: Event) => {
    if (!checkValues()) {
        isAccepted.value = false
        return
    }
    isAccepted.value = true
    useBooks().createBook({
        name: name.value!,
        authorId: authorId.value!,
        description: description.value!,
        genresIds: genresIds.value,
        coverImage: coverImage.value!,
        file: file.value!,
    })
}

</script>

<!-- ToDo accept only good type of files -->
<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <input type="text" v-model="name" placeholder="Название книги">
            <!-- Автора как поиск -->
            <input type="text" v-model="authorId" placeholder="Автор книги">

            <input type="text" v-model="description" placeholder="Описание книги">

            <div v-for="genre in genres">
                <input type="checkbox" :id="genre.id" :value="genre.id" v-model="genresIds">
                <label :for="genre.id">{{ genre.name }}</label>
            </div>

            <input type="file" id="coverImageInput" ref="coverImageInput" @change="onCoverImageChange" accept=".png, .jpg, .jpeg, .svg">
            <input type="file" id="fileInput" ref="fileInput" @change="onFileChange" accept=".txt">

            <input type="checkbox" id="agreeToPublish" v-model="agreeToPublish">
            <label for="agreeToPublish">Я даю согласие на публикацию в открытый доступ</label>
            
            <input type="checkbox" id="confirmOwnership" v-model="confirmOwnership">
            <label for="confirmOwnership">Я подтверждаю, что имею право на публикацию данного материала</label>

            <button type="submit">Создать</button>
            <!-- Можно сделать компонент formError -->
            <h2 v-if="!areValuesCorrect">Вы заполнили не все поля</h2>
            <h2 v-if="isAccepted">Поля заполнены правильно</h2>
        </form>

        


        

    </div>
</template>

<style scoped lang="scss">

</style>
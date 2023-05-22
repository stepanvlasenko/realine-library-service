<script setup lang="ts">
import { useFiles } from '~/compasables/useFiles';
import { useGenres } from '../../stores/genres'
import { useBooks } from '~/stores/books';
import { IAuthor } from '~/assets/ts/types';
import { useAuthorSearch } from '../../compasables/useSearch'

const genres = useGenres().getGenres()
const authorSearch = useAuthorSearch()

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
const onSubmit = async (event: Event) => {
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
        coverImage: await useFiles().fileToBuffer(coverImage.value!),
        file: await useFiles().fileToBuffer(file.value!),
    })
}
const searchAuthorRequest = ref('')
const searchedAuthors = ref<IAuthor[]>([])

debouncedWatch(searchAuthorRequest, async () => {
    searchedAuthors.value = await authorSearch.searchAuthors(searchAuthorRequest.value)
}, {
    debounce: 300,
})
const getFullName = (author: IAuthor): string => {
        if (author.secondName)
            return `${author.name} ${author.secondName} ${author.surname}`
        return `${author.name} ${author.surname}`
    }
</script>

<!-- ToDo accept only good type of files -->
<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <input type="text" v-model="name" placeholder="Название книги">
            <!-- Автора как поиск -->
            <input type="text" v-model="searchAuthorRequest" placeholder="Автор книги">
            <div>
                <!-- <RadioAuthor v-for="author in searchedAuthors" :author="author" :key="author.id"></RadioAuthor> -->
                <div v-for="author in searchedAuthors" :author="author" :key="author.id">
                    <input type="radio" :id="author.id" :value="author.id" v-model="authorId">
                    <label class="form__text" :for="author.id">{{ getFullName(author) }}</label>
                </div>

            </div>

            <input type="text" v-model="description" placeholder="Описание книги">
            <div class="form__genre">
                <h3 class="form__text">Укажите жанр книги</h3>
                <div v-for="genre in genres">
                    <input type="checkbox" :id="genre.id" :value="genre.id" v-model="genresIds">
                    <label class="form__text" :for="genre.id">{{ genre.name }}</label>
                </div>
            </div>

            <div class="form__file">
                <label class="form__text" for="coverImageInput">Загрузите обложку книги</label>
                <input class="form__file-input" type="file" id="coverImageInput" ref="coverImageInput" @change="onCoverImageChange" accept=".jpeg">
            </div>

            <div class="form__file">
                <label class="form__text" for="fileInput">Загрузите файл книги</label>
                <input class="form__file-input" type="file" id="fileInput" ref="fileInput" @change="onFileChange" accept=".txt">
            </div>

            <div>
                <input type="checkbox" id="agreeToPublish" v-model="agreeToPublish">
                <label class="form__text" for="agreeToPublish">Я даю согласие на публикацию в открытый доступ</label>
            </div>

            <div>
                <input type="checkbox" id="confirmOwnership" v-model="confirmOwnership">
                <label class="form__text" for="confirmOwnership">Я подтверждаю, что имею право на публикацию данного материала</label>
            </div>

            <button type="submit">Создать</button>
            <!-- Можно сделать компонент formError -->
            <h2 class="form__text" v-if="!areValuesCorrect">Вы заполнили не все поля</h2>
            <h2 class="form__text" v-if="isAccepted">Поля заполнены правильно</h2>
        </form>






    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/index.scss' as styles;

.form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__text {
        color: map-get($map: styles.$colors, $key: gray-light);
    }

    &__file {
        display: flex;
        flex-direction: column;
        gap: 4px;
        &-input {
            color: map-get($map: styles.$colors, $key: gray-light);
        }
    }
}
</style>

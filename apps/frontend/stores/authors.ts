import { defineStore } from 'pinia'
import type { Author as PrismaAuthor } from '@types'

class Author implements PrismaAuthor {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public description: string,
        public writtenBooksIds: string[],
        public birthday: Date,
        public dayOfDeath: Date,
        public secondName: string | null,
    ) {}

    public getFullName(): string {
        if (this.secondName)
            return `${this.name} ${this.secondName} ${this.surname}`
        return `${this.name} ${this.surname}`
    }
}
// ТЫ НЕ ЛОВИШЬ ОШИБКИ!!! А ЧТО ЕСЛИ НЕТ ТАКОГО АВТОРА!!!!*???!?!?!??! С КНИГАМИ ТОЖЕ САМОЕ
// В реквесте я не привожу респонс к классу автор
export const useAuthors = defineStore('authors', () => {
    const loadedAuthors: Author[] = [
        new Author('0', 'Александр', 'Пушкин', 'Вообще-то Дюма', ['0'], new Date(), new Date(), 'Сергеевич'),
        new Author('1', 'Григорий', 'Мельник', 'Лалка', ['1'], new Date(), new Date(), 'Папочка'),
        new Author('2', 'Николай', 'Гоголь', 'Не горький', ['2'], new Date(), new Date(), 'Васильевич'),
    ]

    /**
     * request and add in loadedAuthors
     * @param id id of author
     * @returns author with this id
     */
    const fetchAuthorById = async (id: string) => {
        const responce = await $fetch<Author>('/api/authors/**', {
            params: {
                id,
            },

        })
        loadedAuthors.push(responce)
        return responce
    }

    /**
     * If author with this id isn't loaded, function will load it
     * @param id id of author
     * @returns author with this id
     */
    const getAuthorById = async (id: string) => {
        return loadedAuthors.find(v => v.id === id) || await fetchAuthorById(id)
    }

    return { loadedAuthors, getAuthorById }
})

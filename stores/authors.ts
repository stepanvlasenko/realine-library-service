import { defineStore } from 'pinia'
import type { IAuthor } from '@types'

class Author implements IAuthor {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public description: string,
        public writtenBooksIds: string[],
        public birthday: Date,
        public dayOfDeath: Date | null,
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
    const loadedAuthors: Author[] = []

    /**
     * request and add in loadedAuthors
     * @param id id of author
     * @returns author with this id
     */
    const fetchAuthorById = async (id: string) => {
        const responce = await $fetch<IAuthor>('/api/authors/**', {
            method: 'GET',
            params: {
                id,
            },
        })
        const author = new Author(responce.id, responce.name, responce.surname, responce.description, responce.writtenBooksIds, responce.birthday, responce.dayOfDeath, responce.secondName)
        loadedAuthors.push(author)
        return author
    }

    /**
     * If author with this id isn't loaded, function will load it
     * @param id id of author
     * @returns author with this id
     */
    const getAuthorById = async (id: string) => {
        return loadedAuthors.find(v => v.id === id) || await fetchAuthorById(id)
    }

    return { getAuthorById }
})

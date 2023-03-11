import { defineStore } from 'pinia'
import type { IAuthor } from '@types'

class Author implements IAuthor {
    constructor(
        public ID: number,
        public name: string,
        public surname: string,
        public description: string,
        public writtenBooksID: Array<number>,
        public birthday: Date,
        public dayOfDeath: Date,
        public secondName?: string,
    ) {}

    public getFullName(): string {
        if (this.secondName)
            return `${this.name} ${this.secondName} ${this.surname}`
        return `${this.name} ${this.surname}`
    }
}
// ТЫ НЕ ЛОВИШЬ ОШИБКИ!!! А ЧТО ЕСЛИ НЕТ ТАКОГО АВТОРА!!!!*???!?!?!??! С КНИГАМИ ТОЖЕ САМОЕ
export const useAuthors = defineStore('authors', () => {
    const loadedAuthors: Author[] = [new Author(0, 'Александр', 'Пушкин', 'Вообще-то Дюма', [0], new Date(), new Date(), 'Сергеевич')]

    /**
     * request and add in loadedAuthors
     * @param ID ID of author
     * @returns author with this ID
     */
    const fetchAuthorByID = async (ID: number) => {
        const responce = await $fetch<Author>(`/api/authors/${ID}`, {
            onResponseError: (ctx) => {
                throw new Error(String(ctx))
            },
        })
        loadedAuthors.push(responce)
        return responce
    }

    /**
     * If author with this ID isn't loaded, function will load it
     * @param ID ID of author
     * @returns author with this ID
     */
    const getAuthorByID = async (ID: number) => {
        return loadedAuthors.find(v => v.ID === ID) || await fetchAuthorByID(ID)
    }

    return { loadedAuthors, fetchAuthorByID, getAuthorByID }
})

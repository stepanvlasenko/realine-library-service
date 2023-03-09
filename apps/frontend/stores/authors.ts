import { defineStore } from 'pinia'
import type { IAuthor } from '@types'

class Author implements IAuthor {
    ID: number
    name: string
    surname: string
    description: string
    writtenBooksID: Array<number>
    birthday: Date
    dayOfDeath: Date
    secondName?: string

    constructor(
        ID: number,
        name: string,
        surname: string,
        description: string,
        writtenBooksID: Array<number>,
        birthday: Date,
        dayOfDeath: Date,
        secondName?: string,
    ) {
        this.ID = ID
        this.name = name
        this.surname = surname
        this.secondName = secondName
        this.description = description
        this.writtenBooksID = writtenBooksID
        this.birthday = birthday
        this.dayOfDeath = dayOfDeath
    }
}
// ТЫ НЕ ЛОВИШЬ ОШИБКИ!!! А ЧТО ЕСЛИ НЕТ ТАКОГО АВТОРА!!!!*???!?!?!??! С КНИГАМИ ТОЖЕ САМОЕ
export const useAuthors = defineStore('authors', () => {
    const loadedAuthors: Author[] = []

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

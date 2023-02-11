import { defineStore } from 'pinia'
import type { IBook } from '@types'

export const useBooks = defineStore('books', () => {
    const loadedBooks: IBook[] = []

    /**
     * return book with id in param
     * @param id id of book
     */
    // Сделать нормальный запрос
    const fetchBookByID = async (id: number) => {
        const responce = await $fetch<IBook>(`/api/books/${id}`)
        loadedBooks.push(responce)
        return responce
    }

    /**
     * return book with id in param
     * @param id id of book
     */
    const getBookByID = async (id: number) => {
        return loadedBooks.find(v => v.ID === id) || await fetchBookByID(id)
    }

    /**
     * return books with ids in param
     * @param ids array of ids of book
     */
    // Сделать нормальный запрос
    const fetchBooksByIDs = async (ids: number[]) => {
        const params = ids.join(',')
        const responce = await $fetch<IBook[]>(`/api/books/${params}`)
        loadedBooks.push(...responce)
        return responce
    }

    /**
     * return books with ids in param
     * @param ids array of ids of book
     */
    const getBooksByIDs = async (ids: number[]) => {
        const filteredBooks = loadedBooks.filter(v => ids.includes(v.ID))
        if (filteredBooks.length === 0) {
            return await fetchBooksByIDs(ids)
        }
        else if (filteredBooks.length !== ids.length) {
            const foundedIDs = filteredBooks.map(v => v.ID)
            const unfoundedIDs = ids.filter(v => !foundedIDs.includes(v))
            return [...filteredBooks, ...(await fetchBooksByIDs(unfoundedIDs))]
        }
        else {
            return filteredBooks
        }
    }

    return { loadedBooks, fetchBookByID, getBookByID, fetchBooksByIDs, getBooksByIDs }
})

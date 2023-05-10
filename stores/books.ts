import { defineStore } from 'pinia'
import type { IBook, InputBook } from '@types'

export const useBooks = defineStore('books', () => {
    const loadedBooks: IBook[] = []

    /**
     * return books with ids in param
     * @param ids array of ids of book
     */
    const fetchBooksByIds = async (ids: string[]) => {
        const responce = await $fetch<IBook[]>('/api/books/**', {
            method: 'GET',
            params: {
                ids,
            },
        })
        loadedBooks.push(...responce)
        return responce
    }

    /**
     * return books with ids in param
     * @param ids array of ids of book
     */
    const getBooksByIds = async (ids: string[]) => {
        const filteredBooks = loadedBooks.filter(v => ids.includes(v.id))
        if (filteredBooks.length === 0) {
            return await fetchBooksByIds(ids)
        }
        else if (filteredBooks.length !== ids.length) {
            const foundIds = filteredBooks.map(v => v.id)
            const unfoundIds = ids.filter(v => !foundIds.includes(v))
            return [...filteredBooks, ...(await fetchBooksByIds(unfoundIds))]
        }
        else {
            return filteredBooks
        }
    }

    /**
     * return book with id in param
     * @param id id of book
     */
    const getBookById = async (id: string) => {
        return (await getBooksByIds([id]))[0]
    }

    /**
     * @param book book which you want to get similar
     * @returns books which similar to this book
     */
    const fetchSimilarBooksById = async (id: string) => {
        const responce = await $fetch<IBook[]>('/api/similarbooks/**', {
            method: 'GET',
            params: {
                id: id,
            }
        })
        return responce
    }

    /**
     * creates this book in database
     * @param book book with custom properties
     * @returns void
     */
    const createBook = async (book: InputBook) => {
        await $fetch('/api/books/**', {
            method: 'POST',
            body: {
                book: book
            }
        })
    }
    return { getBookById, getBooksByIds, fetchSimilarBooksById, createBook }
})

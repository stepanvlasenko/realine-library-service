import { defineStore } from 'pinia'
import type { IBook } from '@types'
import { useAuthors } from './authors'

export const useBooks = defineStore('books', () => {
    const loadedBooks: IBook[] = []

    /**
     * return books with ids in param
     * @param ids array of ids of book
     */
    // Сделать нормальный запрос
    const fetchBooksByIDs = async (ids: number[]) => {
        const responce = await $fetch<IBook[]>('/api/books/**', {
            params: {
                ids,
            },
            onResponseError: (ctx) => {
                throw new Error(String(ctx))
            },
        })
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
            const foundIDs = filteredBooks.map(v => v.ID)
            const unfoundIDs = ids.filter(v => !foundIDs.includes(v))
            return [...filteredBooks, ...(await fetchBooksByIDs(unfoundIDs))]
        }
        else {
            return filteredBooks
        }
    }
    /**
     * return book with id in param
     * @param id id of book
     */
    const getBookByID = async (id: number) => {
        return (await getBooksByIDs([id]))[0]
    }

    /**
     * calls getBooksByIDs with ids of books by this author
     * @returns array of books by this author
     */
    const getBooksByAuthorID = async (authorID: number) => {
        const author = await useAuthors().getAuthorByID(authorID)
        return getBooksByIDs(author.writtenBooksID)
    }
    /**
     * @param book book which you want to get similar
     * @returns books which similar to this book
     */
    // URL кал
    const fetchSimilarBooksByBook = async (book: IBook) => {
        const responce = await $fetch<IBook[]>(`api/similarbooks/${book.ID}`, {
            onResponseError: (ctx) => {
                throw new Error(String(ctx))
            },
        })
        return responce
    }

    const fetchBooksByFirstSymbol = async (sym: string) => {
        const responce = await $fetch<IBook[]>(`api/searchbooks/${sym}`, {
            onResponseError: (ctx) => {
                throw new Error(String(ctx))
            },
        })
        return responce
    }
    return { loadedBooks, getBookByID, getBooksByIDs, getBooksByAuthorID, fetchSimilarBooksByBook, fetchBooksByFirstSymbol }
})

import { defineStore } from 'pinia'
import type { Book } from '@types'
import { useAuthors } from './authors'

export const useBooks = defineStore('books', () => {
    const loadedBooks: Book[] = []

    /**
     * return books with ids in param
     * @param ids array of ids of book
     */
    // Сделать нормальный запрос
    const fetchBooksByIds = async (ids: string[]) => {
        const responce = await $fetch<Book[]>('/api/books/**', {
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
     * calls getBooksByIds with ids of books by this author
     * @returns array of books by this author
     */
    const getBooksByAuthorId = async (authorId: string) => {
        const author = await useAuthors().getAuthorById(authorId)
        return getBooksByIds(author.writtenBooksIds)
    }
    /**
     * @param book book which you want to get similar
     * @returns books which similar to this book
     */
    // URL кал
    const fetchSimilarBooksByBook = async (book: Book) => {
        const responce = await $fetch<Book[]>(`api/similarbooks/${book.id}`, {
            onResponseError: (ctx) => {
                throw new Error(String(ctx))
            },
        })
        return responce
    }

    const fetchBooksByFirstSymbol = async (sym: string) => {
        const responce = await $fetch<Book[]>(`api/searchbooks/${sym}`)
        return responce
    }
    return { loadedBooks, getBookById, getBooksByIds, getBooksByAuthorId, fetchSimilarBooksByBook, fetchBooksByFirstSymbol }
})

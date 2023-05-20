import type { IAuthor, IBook } from '@types'

export const useBookSearch = () => {
    const searchBooks = async (queryString: string, responceLength = 10): Promise<IBook[]> => {
        if (!queryString) {
            return []
        }
        return await $fetch<IBook[]>('/api/search/books/**', {
            params: {
                queryString,
                responceLength
            }
        })
    }
    return { searchBooks }
}

export const useAuthorSearch = () => {
    const searchAuthors = async (queryString: string) => {
        if (!queryString) {
            return []
        }
        return await $fetch<IAuthor[]>('/api/search/authors/**', {
            params: {
                queryString
            }
        })
    }
    return { searchAuthors }
}

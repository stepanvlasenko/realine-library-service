import type { IBook } from '@types'

export const useBookSearch = () => {

    const searchBooks = async (queryString: string, responceLength = 10): Promise<IBook[]> => {
        if (!queryString) {
            return []
        }
        return await $fetch<IBook[]>('/api/searchbooks/**', {
            params: {
                queryString,
                responceLength
            }
        })
    }
    return { searchBooks }
}

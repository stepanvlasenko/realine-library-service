import { defineStore } from 'pinia'
import { IGenre } from '@types'

export const useGenres = defineStore('genres', () => {
    const genres: IGenre[] = [
        {
            id: '0',
            name: 'Роман-эпопея',
        },
        {
            id: '1',
            name: 'Роман',
        },
        {
            id: '2',
            name: 'Рассказ',
        },
        {
            id: '3',
            name: 'Поэма',
        },
        {
            id: '4',
            name: 'Повесть',
        },
    ]
    
    const getGenres = () => {
        return genres
    }
    return { getGenres }
})
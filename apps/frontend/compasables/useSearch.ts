import type { IBook } from '@types'
// import { useBooks } from '../stores/books'

interface sets {
    [propname: string]: IBook[]
}

export const useBookSearch = () => {
    const sets: sets = {
        a: [{
            ID: 0,
            name: 'aaab',
            ISBN: 'ISBN',
            authorID: 0,
            publisherID: 0,
            description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
            genresID: [0, 1, 2],
            reviewsID: [0, 1, 2],
            rating: 4.5,
            coverImageURL: '/images/test-book.jpg',
            keywords: ['book'],
            publishDate: new Date(0),
            fileURL: 'string',
            createdAt: new Date(0),
            updatedAt: new Date(0),
        }, {
            ID: 0,
            name: 'abab',
            ISBN: 'ISBN',
            authorID: 0,
            publisherID: 0,
            description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
            genresID: [0, 1, 2],
            reviewsID: [0, 1, 2],
            rating: 4.5,
            coverImageURL: '/images/test-book.jpg',
            keywords: ['book'],
            publishDate: new Date(0),
            fileURL: 'string',
            createdAt: new Date(0),
            updatedAt: new Date(0),
        }],
        b: [{
            ID: 0,
            name: 'baab',
            ISBN: 'ISBN',
            authorID: 0,
            publisherID: 0,
            description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
            genresID: [0, 1, 2],
            reviewsID: [0, 1, 2],
            rating: 4.5,
            coverImageURL: '/images/test-book.jpg',
            keywords: ['book'],
            publishDate: new Date(0),
            fileURL: 'string',
            createdAt: new Date(0),
            updatedAt: new Date(0),
        }, {
            ID: 0,
            name: 'bdab',
            ISBN: 'ISBN',
            authorID: 0,
            publisherID: 0,
            description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
            genresID: [0, 1, 2],
            reviewsID: [0, 1, 2],
            rating: 4.5,
            coverImageURL: '/images/test-book.jpg',
            keywords: ['book'],
            publishDate: new Date(0),
            fileURL: 'string',
            createdAt: new Date(0),
            updatedAt: new Date(0),
        }],
    }
    let currentSubSet: IBook[] = []

    const addSubSet = async (hash: string, set: IBook[]) => {
        sets[hash] = set
        // sets[hash] = await useBooks().fetchBooksByFirstSymbol(hash)
        return sets[hash]
    }

    const getSubSet = async (hash: string) => {
        return (Object.keys(sets).includes(hash)) ? sets[hash] : await addSubSet(hash, [])
    }

    const searchBooks = async (request: string) => {
        if (request.length === 0)
            return []

        if (request.length === 1) {
            currentSubSet = await getSubSet(request)
            return currentSubSet
        }
        else {
            return currentSubSet.filter((v) => {
                return v.name.includes(request)
            })
        }
    }

    return { searchBooks }
}

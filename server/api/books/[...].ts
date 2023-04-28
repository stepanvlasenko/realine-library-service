import { isArray } from '@vue/shared'
import { getBooksByIds, addBook } from '../../database'
import { InputBook } from '@types'
// // const books: IBook[] = [
// //     {
// //         ID: 0,
// //         name: 'Война и мир',
// //         ISBN: 'ISBN',
// //         authorID: 0,
// //         publisherID: 0,
// //         description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
// //         genresID: [0, 1, 2],
// //         reviewsID: [0, 1, 2],
// //         rating: 4.5,
// //         coverImageURL: '/images/test-book.jpg',
// //         keywords: ['book'],
// //         publishDate: new Date(0),
// //         fileURL: 'string',
// //         createdAt: new Date(0),
// //         updatedAt: new Date(0),
// //     },
// //     {
// //         ID: 1,
// //         name: 'Горе от ума',
// //         ISBN: 'ISBN',
// //         authorID: 1,
// //         publisherID: 0,
// //         description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
// //         genresID: [0, 1, 2],
// //         reviewsID: [0, 1, 2],
// //         rating: 4.5,
// //         coverImageURL: '/images/test-book.jpg',
// //         keywords: ['book'],
// //         publishDate: new Date(0),
// //         fileURL: 'string',
// //         createdAt: new Date(0),
// //         updatedAt: new Date(0),
// //     },
// //     {
// //         ID: 2,
// //         name: 'Кому на руси жить хорошо',
// //         ISBN: 'ISBN',
// //         authorID: 2,
// //         publisherID: 0,
// //         description: 'description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsum description lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsumdescription lorem ipsum',
// //         genresID: [0, 1, 2],
// //         reviewsID: [0, 1, 2],
// //         rating: 4.5,
// //         coverImageURL: '/images/test-book.jpg',
// //         keywords: ['book'],
// //         publishDate: new Date(0),
// //         fileURL: 'string',
// //         createdAt: new Date(0),
// //         updatedAt: new Date(0),
// //     },
// // ]

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (getMethod(event) === 'GET') {
        if (query.ids) {
            const ids = isArray(query.ids) ? query.ids.map(v => '' + v) : ['' + query.ids]
            return await getBooksByIds(ids)
        } else {
            throw new Error('ids must be passed or ids must be array')
        }
    }
    
    if (getMethod(event) === 'POST') {
        if (query.book && typeof query.book === 'string') {
            const book = JSON.parse(query.book) as InputBook
            await addBook(book)
            return 1
         }else {
            throw new Error('wrong book was gotten')
        }
    }
})

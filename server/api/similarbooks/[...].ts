import { getSimilarBooksById } from '../../database'

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

// Ещё надо сделать чтобы сортировалось по убыванию кол-ва совпадений

export default defineEventHandler((event) => {
    const query = getQuery(event)

    if (query.id && typeof query.id === 'string') {
        if (getMethod(event) === 'GET')
            return getSimilarBooksById(query.id)
    }
    else {
        throw new Error('id must be passed or id must be single, not array')
    }
})

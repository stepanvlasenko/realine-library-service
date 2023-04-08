// import { isArray } from '@vue/shared'
// import { getBooksByIds } from '../../database'
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

// export default defineEventHandler(async (event) => {
//     const query = getQuery(event)

//     if (query.ids && isArray(query.ids)) {
//         const ids = query.ids.map(v => '' + v)

//         if (getMethod(event) === 'GET')
//             return await getBooksByIds(ids)
//     }
//     else {
//         createError('ids must be passed or ids must be array')
//     }
// })

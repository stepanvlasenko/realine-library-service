// import { getUserById } from '../../database'

// // const users: IUser[] = [
//     // {
//     //     ID: 0,
//     //     role: 'user',
//     //     username: 'Kyle',
//     //     birthday: new Date(0),
//     //     avatarURL: '/images/test-book.jpg',
//     //     email: 'Reyden732@gmail.com',
//     //     interests: ['horror', 'fantasy'],
//     //     readedBooksID: [0, 1, 2],
//     //     favoritesID: [0, 1, 2],
//     //     createdAt: new Date(0),
//     //     updatedAt: new Date(0),
//     // },
// //     {
// //         ID: 1,
// //         role: 'user',
// //         username: 'Mia',
// //         birthday: new Date(0),
// //         avatarURL: '/images/test-book.jpg',
// //         email: 'Reyden732@gmail.com',
// //         interests: ['horror', 'fantasy'],
// //         readedBooksID: [0, 1, 2],
// //         favoritesID: [0, 1, 2],
// //         createdAt: new Date(0),
// //         updatedAt: new Date(0),
// //     },
// //     {
// //         ID: 2,
// //         role: 'moderator',
// //         username: 'Jack',
// //         birthday: new Date(0),
// //         avatarURL: '/images/test-book.jpg',
// //         email: 'Reyden732@gmail.com',
// //         interests: ['horror', 'fantasy'],
// //         readedBooksID: [0, 1, 2],
// //         favoritesID: [0, 1, 2],
// //         createdAt: new Date(0),
// //         updatedAt: new Date(0),
// //     },
// // ]

// export default defineEventHandler(async (event) => {
//     const query = getQuery(event)

//     if (query.id && typeof query.id === 'string') {
//         if (getMethod(event) === 'GET')
//             return await getUserById(query.id)
//     }
//     else {
//         createError('id must be passed or id must be single, not array')
//     }
// })

import { PrismaClient } from '@prisma/client'
import type { Book } from '@prisma/client'

// Prisma не конвертируется в JSON
const prisma = new PrismaClient()

export async function preventDatabase() {
    await prisma.$connect()

    // await prisma.user.create({
    //     data: {
    //         // password: 'password',
    //         username: 'Kyle',
    //         birthday: new Date(0),
    //         // role: 'USER',
    //         // interestsIds: ['0'],
    //         // readedBooksIds: ['0'],
    //         // favoritesIds: ['0'],
    //         // email: 'Reyden732@gmail.com',
    //         // avatarURL: '/images/test-book.jpg',
    //         // createdAt: new Date(0),
    //         // updatedAt: new Date(0),
    //     }
    // })
    await prisma.book.create({
        data: {
            name: 'Книга',
            ISBN: 'хер знает что'
        }
    })

    await prisma.$disconnect()
}

// export const getUserById = async (id: string) => {
//     await prisma.$connect()

//     const user = await prisma.user.findUnique({
//         where: {
//             id: id
//         }
//     })

//     await prisma.$disconnect()

//     return user
// }

export const getBooksByIds = async (ids: string[]) => {
    await prisma.$connect()

    const books = await prisma.book.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    await prisma.$disconnect()

    return books
}

// const arraysCrossing = <T = unknown>(array1: T[], array2: T[]): T[] => {
//     return array1.filter(v => array2.includes(v))
// }

// // Todo: sort by crossings count decrease
// export const getSimilarBooksById = async (id: string, minCrossingCount = 2) => {
//     await prisma.$connect()

//     const book = await prisma.book.findUnique({
//         where: {
//             id: id
//         }
//     })

//     if (!book)
//         throw new Error('Can`t find book with this id')

//     const books = await prisma.book.findMany()
//     const result = books.filter((v) => {
//         return (arraysCrossing(v.genresIds, book.genresIds).length >= minCrossingCount) && v.id !== book.id
//     })

//     prisma.$disconnect()

//     return result
// }

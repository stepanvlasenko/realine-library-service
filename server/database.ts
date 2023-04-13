import { PrismaClient } from '@prisma/client'
import { useDatabaseSerialize } from '~/compasables/useDatabaseSerialize';

// Prisma не конвертируется в JSON
const prisma = new PrismaClient()

export async function preventDatabase() {
    await prisma.$connect()

    await prisma.$disconnect()
}

export const getUserById = async (id: string) => {
    await prisma.$connect()

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    await prisma.$disconnect()
    if (user) {
        return useDatabaseSerialize().prismaUserToUser(user)
    }
}

export const getAuthorById = async (id: string) => {
    await prisma.$connect()

    const author = await prisma.author.findUnique({
        where: {
            id: id
        }
    })

    await prisma.$disconnect()
    if (author) {
        return useDatabaseSerialize().prismaAuthorToAuthor(author)
    }
}

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

    return books.map(useDatabaseSerialize().prismaBookToBook)
}

const arraysCrossing = <T = unknown>(array1: T[], array2: T[]): T[] => {
    return array1.filter(v => array2.includes(v))
}

// Todo: sort by crossings count decrease
export const getSimilarBooksById = async (id: string, minCrossingCount = 2) => {
    await prisma.$connect()

    const rawBook = await prisma.book.findUnique({
        where: {
            id: id
        }
    })
    const rawBooks = await prisma.book.findMany()

    prisma.$disconnect()

    if (!rawBook) {
        throw new Error('Can`t find book with this id')
    }

    const book = useDatabaseSerialize().prismaBookToBook(rawBook)
    const books = rawBooks.map(useDatabaseSerialize().prismaBookToBook)

    const result = books.filter((v) => {
        return (arraysCrossing(v.genresIds, book.genresIds).length >= minCrossingCount) && v.id !== book.id
    })

    return result
}

// Хочу приоритетно отправлять книги, у которых queryString в начале названия. 
// Есть вариант пробегать по всем книгам 2 раза. Сначала те, у которых в совпадание в начале (startWith). Потом те, у которых просто есть. Затем делать уникальные функцией arraysCrossing
// Есть же вариант для пробегда сложности n^2, думаю его стоит отмести

export const searchBooks = async (queryString: string, responceLength: number) => {
    await prisma.$connect()

    const rawBooks = await prisma.book.findMany()

    await prisma.$disconnect()

    const booksWhichStartWith = rawBooks.filter((v) => {
        return v.name.toLowerCase().startsWith(queryString.toLowerCase())
    })

    const booksWhichIncludeAndNotStartsWith = (booksWhichStartWith.length < responceLength ?
        rawBooks.filter((v) => {
            return v.name.toLowerCase().includes(queryString.toLowerCase()) && !v.name.toLowerCase().startsWith(queryString.toLowerCase())
        }) : [])
    
    return [...booksWhichStartWith, ...booksWhichIncludeAndNotStartsWith].slice(0, responceLength)
}

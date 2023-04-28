import { useDatabaseSerialize } from '~/compasables/useDatabaseSerialize';
import { useFiles } from '~/compasables/useFiles';
import { InputBook, PrismaBook } from '@types'
import { prisma } from '../database'

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

// Problems
export const addBook = async (rawBook: InputBook) => {
    
    const book: Omit<PrismaBook, 'id'> = {
        name: rawBook.name,
        description: rawBook.description,
        authorId: rawBook.authorId,
        coverImage: await useFiles().fileToBuffer(rawBook.coverImage),
        file: await useFiles().fileToBuffer(rawBook.file),
        genresIds: useDatabaseSerialize().arrayToString(rawBook.genresIds),
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishDate: new Date(),
    }

    await prisma.$connect()

    await prisma.book.create({
        data: book
    })

    await prisma.$disconnect()
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
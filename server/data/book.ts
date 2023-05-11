import { useDatabaseSerialize } from '~/compasables/useDatabaseSerialize';
import { InputBook, PrismaBook } from '@types'
import { prisma } from '../database'
import * as firebase from '../lib/firebase'

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

export const addBook = async (rawBook: InputBook) => {
    await prisma.$connect()
    const book = await prisma.book.create({
        data: {
            name: rawBook.name,
            description: rawBook.description,
            authorId: rawBook.authorId,
            coverImageURL: '',
            fileURL: '',
            genresIds: useDatabaseSerialize().arrayToString(rawBook.genresIds),
            rating: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            publishDate: new Date(),
        }
    })
    await prisma.$disconnect()

    const imageBuffer = JSON.parse(JSON.stringify((rawBook.coverImage)))
    const fileBuffer = JSON.parse(JSON.stringify((rawBook.file)))

    await firebase.sendImage(book.id + '.jpeg', imageBuffer.data)
    await firebase.sendFile(book.id + '.txt', fileBuffer.data)

    const coverImageURL = await firebase.getImageURL(book.id + '.jpeg')
    const fileURL = await firebase.getFileURL(book.id + '.txt')
    await prisma.$connect()
    await prisma.book.update({
        where: {
            id: book.id
        },
        data: {
            coverImageURL: coverImageURL,
            fileURL: fileURL,
        }
    })
    await prisma.$disconnect()
}

const arraysCrossing = <T = unknown>(array1: T[], array2: T[]): T[] => {
    return array1.filter(v => array2.includes(v))
}

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

export const getAuthorOwnedBooksIds = async (id: string) => {
    await prisma.$connect()
    const books = await prisma.book.findMany({
        where: {
            authorId: id
        }
    })
    await prisma.$disconnect()
    return books.map(v => v.id)
}


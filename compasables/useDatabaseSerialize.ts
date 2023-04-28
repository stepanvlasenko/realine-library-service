import type { PrismaBook, IBook, PrismaUser, IUser, PrismaAuthor, IAuthor } from '@types'
import { useFiles } from '~/compasables/useFiles'

export const useDatabaseSerialize = () => {
    /**
     *
     * @param str string formated as "a,b,c,d,e"
     * @returns [a, b, c, d, e]
     */
    const stringToArray = (str: string): string[] => {
        return str.split(',')
    }

    /**
     *
     * @param arr array
     * @returns string formated as "a,b,c,d,e"
     */
    const arrayToString = (arr: string[]): string => {
        return arr.join(',')
    }

    const prismaBookToBook = (book: PrismaBook): IBook => {
        return {
            id: book.id,
            name: book.name,
            authorId: book.authorId,
            description: book.description,
            genresIds: stringToArray(book.genresIds),
            rating: book.rating,
            coverImage: useFiles().bufferToFile(book.coverImage, book.id),
            publishDate: book.publishDate,
            file: useFiles().bufferToFile(book.file, book.id),
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
        }
    }

    const bookToPrismaBook = async (book: IBook): Promise<PrismaBook> => {
        return {
            id: book.id,
            name: book.name,
            authorId: book.authorId,
            description: book.description,
            genresIds: arrayToString(book.genresIds),
            rating: book.rating,
            coverImage: await useFiles().fileToBuffer(book.coverImage),
            // keywords: arrayToString(book.keywords),
            publishDate: book.publishDate,
            file: await useFiles().fileToBuffer(book.file),
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
        }
    }

    const prismaUserToUser = (user: PrismaUser): IUser => {
        return {
            id: user.id,
            username: user.username,
            birthday: user.birthday,
            role: user.role,
            interestsIds: stringToArray(user.interestsIds),
            readedBooksIds: stringToArray(user.readedBooksIds),
            favoritesIds: stringToArray(user.favoritesIds),
            email: user.email,
            avatarURL: user.avatarURL,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }

    const prismaAuthorToAuthor = (author: PrismaAuthor): IAuthor => {
        return {
            id: author.id,
            name: author.name,
            surname: author.surname,
            description: author.description,
            writtenBooksIds: stringToArray(author.writtenBooksIds),
            birthday: author.birthday,
            dayOfDeath: author.dayOfDeath,
            secondName: author.secondName,
        }
    }
    return { stringToArray, arrayToString, prismaBookToBook, bookToPrismaBook, prismaUserToUser, prismaAuthorToAuthor }
}

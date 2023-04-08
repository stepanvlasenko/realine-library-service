import type { PrismaBook, IBook, PrismaUser, IUser, PrismaAuthor, IAuthor } from '@types'

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
            ISBN: book.ISBN,
            authorId: book.authorId,
            publisherId: book.publisherId,
            description: book.description,
            genresIds: stringToArray(book.genresIds),
            reviewsIds: stringToArray(book.reviewsIds),
            rating: book.rating,
            coverImageURL: book.coverImageURL,
            keywords: stringToArray(book.keywords),
            publishDate: book.publishDate,
            fileURL: book.fileURL,
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
    return { stringToArray, arrayToString, prismaBookToBook, prismaUserToUser, prismaAuthorToAuthor }
}

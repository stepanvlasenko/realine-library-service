export {
    Book as PrismaBook, Author as PrismaAuthor, User as PrismaUser
} from '@prisma/client' 

/**
 * Interface for IBook. Used on frontend
 *
 * TODO: add to package with types and probable change decription of interface because might be used not only on frontend
 */
export interface IBook {
    id: string
    name: string
    authorId: string
    description: string
    genresIds: string[]
    rating: number
    coverImageURL: string
    publishDate: Date
    fileURL: string
    createdAt: Date
    updatedAt: Date
}

export interface InputBook {
    name: string
    authorId: string
    description: string
    genresIds: string[]
    coverImage: Buffer
    file: Buffer
}
/**
 * Interface for User. Used on frontend without password
 *
 * TODO: add to package with types
 */
export interface IUser {
    id: string
    username: string
    birthday: Date
    role: string
    interestsIds: string[]
    readedBooksIds: string[]
    favoritesIds: string[]
    email: string
    avatarURL: string
    // No password
    createdAt: Date
    updatedAt: Date
}

export interface IAuthor {
    id: string
    name: string
    surname: string
    description: string
    writtenBooksIds: string[]
    birthday: Date
    dayOfDeath: Date | null
    secondName: string | null
}

export interface IGenre {
    id: string
    name: string
}

/**
 * type for Book variant. Used on frontend
 *
 * TODO: add to package with types
 */
export type BookVariant = 'vertical' | 'horisontal' | 'small'

/**
 * type for Avatar variant. Used in frontend
 *
 * TODO: add to package with types
 */
export type AvatarVariant = 'default' | 'bordered'

/**
 * type for List variant. Used in frontend
 *
 * TODO: add to package with types
 */
export type ListVariant = 'list' | 'slider'

/**
 * type for User roles. Used in frontend
 *
 * TODO: add to package with types
 */
export type UserRoles = 'user' | 'author' | 'moderator' | 'administrator'

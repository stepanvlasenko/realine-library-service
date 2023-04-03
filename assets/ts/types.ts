// GLOBAL TODO: CHANGE "ID" TO "id"

export {
    Book, Author, User, UserRole
} from '@prisma/client'

// /**
//  * Interface for IBook. Used on frontend
//  *
//  * TODO: add to package with types and probable change decription of interface because might be used not only on frontend
//  */
// export interface IBook {
//     ID: number
//     name: string
//     ISBN: string
//     authorID: number
//     publisherID: number
//     description: string
//     genresID: Array<number>
//     reviewsID: Array<number>
//     rating: number
//     coverImageURL: string
//     keywords: Array<string>
//     publishDate: Date
//     fileURL: string
//     createdAt: Date
//     updatedAt: Date
// }

// /**
//  * Interface for User. Used on frontend without password
//  *
//  * TODO: add to package with types
//  */
// export interface IUser {
//     ID: number
//     username: string
//     birthday: Date
//     role: UserRoles
//     interestsIds: Array<number>
//     readedBooksID: Array<number>
//     favoritesID: Array<number>
//     email: string
//     avatarURL: string
//     // No password
//     createdAt: Date
//     updatedAt: Date
// }

// export interface IAuthor {
//     ID: number
//     name: string
//     surname: string
//     description: string
//     writtenBooksID: Array<number>
//     birthday: Date
//     dayOfDeath: Date
//     secondName?: string
//     getFullName: () => string
// }

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
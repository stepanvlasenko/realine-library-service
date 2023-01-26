/**
 * type for Book variant. Used on frontend
 *
 * TODO: add to package with types
 */
export type BookVariant = 'vertical' | 'horisontal' | 'small'

/**
 * Interface for IBook. Used on frontend
 *
 * TODO: add to package with types and probable change decription of interface because might be used not only on frontend
 */
export interface IBook {
    ID: number
    name: string
    ISBN: string
    authorID: number
    publisherID: number
    description: string
    genresID: Array<number>
    reviewsID: Array<number>
    rating: number
    coverImageURL: string
    keywords: Array<string>
    publishDate: Date
    fileURL: string
    createdAt: Date
    updatedAt: Date
}

/**
 * type for User roles. Used in frontend
 *
 * TODO: add to package with types
 */
export type UserRoles = 'user' | 'author' | 'moderator' | 'administrator'

/**
 * Interface for User. Used on frontend
 *
 * TODO: add to package with types
 */
export interface IUser {
    ID: number
    username: string
    birthday: Date
    role: UserRoles
    interests: Array<string>
    readedBooksID: Array<number>
    favorites_id: Array<number>
    email: string
    avatarURL: string
    // No password
    created_at: Date
    updated_at: Date
}
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
export type ListVariant = 'list' | 'slider' | 'changeable'

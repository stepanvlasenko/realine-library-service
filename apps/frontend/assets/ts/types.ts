export type Variant = 'vertical' | 'horisontal' | 'small'

export interface IBook {
    ID: number
    name: string
    ISBN: string
    authorID: number
    publisherID: number
    description: string
    genresID: Array<number>
    reviewsID: Array<number>
    coverImageURL: string
    keywords: Array<string>
    publishDate: Date
    fileURL: string
    createdAt: Date
    updatedAt: Date
}

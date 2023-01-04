export type Variant = 'vertical' | 'horisontal' | 'small'

export interface IBook {
    ID: Number,
    name: String,
    ISBN: String,
    authorID: Number,
    publisherID: Number,
    description: String,
    genresID: Array<Number>,
    reviewsID: Array<Number>,
    coverImageURL: String,
    keywords: Array<String>,
    publishDate: Date,
    fileURL: String,
    createdAt: Date,
    updatedAt: Date
}

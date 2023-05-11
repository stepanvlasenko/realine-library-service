import { useDatabaseSerialize } from '~/compasables/useDatabaseSerialize';
import { prisma } from '../database'
import { PrismaAuthor } from '@types'

const getFullName = (author: PrismaAuthor) => {
    return author.secondName ? `${author.name} ${author.surname} ${author.secondName}` : `${author.name} ${author.surname}`
}

export const getAuthorById = async (id: string) => {
    await prisma.$connect()

    const author = await prisma.author.findUnique({
        where: {
            id: id,
        }
    })

    await prisma.$disconnect()
    if (author) {
        return useDatabaseSerialize().prismaAuthorToAuthor(author)
    }
}


export const searchAuthors = async (queryString: string) => {
    await prisma.$connect()

    const rawAuthors = await prisma.author.findMany()

    await prisma.$disconnect()

    const searchedAuthors = rawAuthors.filter((v) => {
        return getFullName(v).toLowerCase().includes(queryString.toLowerCase())
    })
    return searchedAuthors
}

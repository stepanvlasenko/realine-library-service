import { PrismaClient } from '@prisma/client'
import type { Book, User, Author } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    await prisma.$connect()

    await prisma.$disconnect()
}

main()

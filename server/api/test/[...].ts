import { PrismaClient } from '@prisma/client'
import * as db from '../../database'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
    return await prisma.book.findMany()
})
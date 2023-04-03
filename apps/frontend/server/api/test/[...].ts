import { PrismaClient } from '@prisma/client'
import * as db from '../../database'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
    await db.preventDatabase()
    return await prisma.user.findMany()
})
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export * from './data/book'
export * from './data/user'
export * from './data/author'

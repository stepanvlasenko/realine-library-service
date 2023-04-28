import { PrismaClient } from '@prisma/client'
import { useDatabaseSerialize } from '~/compasables/useDatabaseSerialize';
import { useFiles } from '~/compasables/useFiles';
import { InputBook, PrismaBook } from '@types'

export const prisma = new PrismaClient()

export * from './data/book'
export * from './data/user'
export * from './data/author'

import { useDatabaseSerialize } from '~/compasables/useDatabaseSerialize';
import { prisma } from '../database'

export const getUserById = async (id: string) => {
    await prisma.$connect()

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    await prisma.$disconnect()
    if (user) {
        return useDatabaseSerialize().prismaUserToUser(user)
    }
}

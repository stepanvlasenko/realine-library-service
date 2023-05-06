import { PrismaClient } from '@prisma/client'
import * as db from '../../database'
import * as fb from '../../lib/firebase'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body.image.data)
    // await fb.sendImage('myNewFile1.png', body.image.data)
    return body
    return await fb.getImageURL('55.jpeg')
})

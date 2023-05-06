import { isArray } from '@vue/shared'
import { getBooksByIds, addBook } from '../../database'
import { InputBook } from '@types'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (getMethod(event) === 'GET') {
        if (query.ids) {
            const ids = isArray(query.ids) ? query.ids.map(v => '' + v) : ['' + query.ids]
            return await getBooksByIds(ids)
        } else {
            throw new Error('ids must be passed or ids must be array')
        }
    }

    if (getMethod(event) === 'POST') {
        const body = await readBody(event)
        const book = body.book as InputBook
            await addBook(book)
            return 1
    }
})

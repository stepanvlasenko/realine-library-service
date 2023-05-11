import { searchAuthors } from '../../../database'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (getMethod(event) === "GET") {
        if ((query.queryString && typeof query.queryString === 'string')) {
            const queryString = query.queryString
            return await searchAuthors(queryString)
        }
    } else {
        throw new Error('query string must be passed or query string must be string')
    }
})
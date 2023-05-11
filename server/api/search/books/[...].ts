import { searchBooks } from '../../../database'
export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (getMethod(event) === 'GET') {
        if ((query.queryString && typeof query.queryString === 'string') &&
        (query.responceLength && typeof query.responceLength === 'string')) {
            const queryString = query.queryString
            const responceLength = +query.responceLength
            return await searchBooks(queryString, responceLength)
        }
    } else {
        throw new Error('query string must be passed or query string must be string')
    }
})
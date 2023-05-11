import { getAuthorOwnedBooksIds } from '../../database'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    if (getMethod(event) === 'GET') {
        if (query.id && typeof query.id === 'string') {
            return await getAuthorOwnedBooksIds(query.id)
        } else {
            throw new Error('id must be passed or id must be single, not array')
        }
    }
})

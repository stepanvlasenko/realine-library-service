import { getSimilarBooksById } from '../../database'

export default defineEventHandler((event) => {
    const query = getQuery(event)

    if (query.id && typeof query.id === 'string') {
        if (getMethod(event) === 'GET')
            return getSimilarBooksById(query.id)
    }
    else {
        throw new Error('id must be passed or id must be single, not array')
    }
})

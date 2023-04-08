import { getAuthorById } from '../../database'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (query.id && typeof query.id === 'string') {
        if (getMethod(event) === 'GET')
            return await getAuthorById(query.id)
    }
    else {
        throw new Error('id must be passed or id must be single, not array')
    }
})

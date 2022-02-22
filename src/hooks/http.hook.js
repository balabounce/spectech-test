import {useCallback} from 'react'

export const useHttp = () => {
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch('http://localhost:3004/' + url, { method, body, headers })
            const data = response.json()

            if(!response.ok) {
                throw new Error('Что-то пошло не так')
            }

            return data
        } catch (e) {
            throw e
        }
    }, [])
  return { request }
}

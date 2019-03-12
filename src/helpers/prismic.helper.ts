import { RichText } from 'prismic-dom'
import { getApi, Predicates } from 'prismic-javascript'
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi'
import { API_ENDPOINT, API_TOKEN } from '../config/prismic.config'

const VALID_LANGUAGES = ['en-us', 'zh-cn']

export class Prismic {
    public static async search(query: { conditions: Array<[string, string]>, options: QueryOptions }) {
        if (query.options.lang && VALID_LANGUAGES.indexOf(query.options.lang.toString()) === -1) {
            throw Error('invalid language')
        }
        const api = await getApi(API_ENDPOINT, { accessToken: API_TOKEN })
        const response = await api.query(
            query.conditions.map(([condition, value]) => Predicates.at(condition, value)),
            query.options,
        )
        return response
    }
    public static async documents(query: { conditions: Array<[string, string]>, options: QueryOptions }) {
        if (query.options.lang && VALID_LANGUAGES.indexOf(query.options.lang.toString()) === -1) {
            throw Error('invalid language')
        }
        const api = await getApi(API_ENDPOINT, { accessToken: API_TOKEN })
        const response = await api.query(
            query.conditions.map(([condition, value]) => Predicates.at(condition, value)),
            query.options,
        )
        return response.results
    }
    public static richToHtml(richtext: any) {
        return RichText.asHtml(richtext)
    }
}

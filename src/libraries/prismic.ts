import { RichText } from 'prismic-dom'
import { getApi, Predicates } from 'prismic-javascript'
import ResolvedApi, { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi'
import { API_ENDPOINT, API_TOKEN } from '../config/prismic'

const VALID_LANGUAGES = ['en-us', 'zh-cn']

export class Prismic {
    public static api: ResolvedApi
    public static async documents(query: { conditions: Array<[string, string]>, options: QueryOptions }) {
        if (query.options.lang && VALID_LANGUAGES.indexOf(query.options.lang.toString()) === -1) {
            throw Error('invalid language')
        }
        if (!this.api) {
            this.api = await getApi(API_ENDPOINT, { accessToken: API_TOKEN })
        }
        const response = await this.api.query(
            query.conditions.map(([condition, value]) => Predicates.at(condition, value)),
            query.options,
        )
        return response.results
    }
    public static richToHtml(richtext: any) {
        return RichText.asHtml(richtext)
    }
}

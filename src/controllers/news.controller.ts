import { Request, Response } from 'express'
import { Logger } from '../libraries/log'
import { Prismic } from '../libraries/prismic'

export class NewsController {

  public async get(req: Request, res: Response) {
    const lang: string = req.query.lang
    const slug = req.params.slug
    try {
      const documents = await Prismic.documents({
        conditions: [
          ['document.type', 'news'],
          ['my.news.uid', slug],
        ],
        options:
        {
          lang,
        },
      })
      if (documents.length === 0) {
        Logger.info(`NEWS GET 404 ${slug} ${lang}`)
        res.status(404).send('not found')
      } else {
        const news = documents.map((doc) => {
          return {
            alternate_languages: doc.alternate_languages,
            content: Prismic.richToHtml(doc.data.content),
            date: doc.data.date,
            lang: doc.lang,
            link: doc.data.link,
            slug: doc.uid,
            thumbnnail: doc.data.thumbnnail,
            title: doc.data.title[0].text,
          }
        })
        res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
        res.json(news[0])
      }

    } catch (error) {
      Logger.error(`NEWS GET 400 ${slug} ${lang} ${error.message}`)
      res.status(400).send('error loading news')
    }
  }

  public async list(req: Request, res: Response) {
    const lang = req.query.lang
    try {
      const documents = await Prismic.documents({
        conditions: [
          ['document.type', 'news'],
        ],
        options:
        {
          lang,
          orderings: '[my.news.date]',
        },
      })
      const news = documents.map((doc) => {
        return {
          alternate_languages: doc.alternate_languages,
          content: Prismic.richToHtml(doc.data.content),
          lang: doc.lang,
          slug: doc.uid,
          title: doc.data.title[0].text,
        }
      })
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
      res.json(news)
    } catch (error) {
      Logger.error(`NEWS LIST ${error.message}`)
      res.status(400).send('error loading news')
    }
  }

}

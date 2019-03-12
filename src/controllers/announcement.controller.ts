import { Request, Response } from 'express'
import { Logger } from '../helpers/log.helper'
import { Prismic } from '../helpers/prismic.helper'

export class AnnouncementController {

  public async get(req: Request, res: Response) {
    const lang: string = req.query.lang
    const slug = req.params.slug
    try {
      const documents = await Prismic.documents({
        conditions: [
          ['document.type', 'announcement'],
          ['my.announcement.uid', slug],
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
    const page = req.query.page ? parseInt(req.query.page, 10) : undefined
    const pageSize = req.query.limit ? parseInt(req.query.limit, 10) : undefined
    try {
      const result = await Prismic.search({
        conditions: [
          ['document.type', 'announcement'],
        ],
        options:
        {
          lang,
          orderings: '[my.announcement.date desc]',
          page,
          pageSize,
        },
      })
      const news = {
        page: result.page,
        total_pages: result.total_pages,
        results: result.results.map((doc) => {
          return {
            content: Prismic.richToHtml(doc.data.content),
            date: doc.data.date,
            link: doc.data.link,
            slug: doc.uid,
            thumbnnail: doc.data.thumbnnail,
            title: doc.data.title[0].text,
          }
        }),
      }
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
      res.json(news)
    } catch (error) {
      Logger.error(`NEWS LIST ${error.message}`)
      res.status(400).send('error loading news')
    }
  }

}

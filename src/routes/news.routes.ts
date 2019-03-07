import { Application } from 'express'
import { NewsController } from '../controllers/news.controller'
import { cache } from '../helpers/cache.helper'

export class NewsRoutes {

  public newsController: NewsController = new NewsController()

  public routes(app: Application): void {
    app.route('/news').get(cache('5 minutes'), this.newsController.list)
    app.route('/news/:slug').get(cache('15 minutes'), this.newsController.get)
  }
}

import { Application } from 'express'
import { NewsController } from '../controllers/news.controller'

export class NewsRoutes {

  public newsController: NewsController = new NewsController()

  public routes(app: Application): void {
    app.route('/news').get(this.newsController.list)
    app.route('/news/:slug').get(this.newsController.get)
  }
}

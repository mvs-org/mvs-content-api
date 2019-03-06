import * as express from 'express'
import { NewsRoutes } from './routes/news.routes'

class App {

  public app: express.Application
  public newsRoutes: NewsRoutes = new NewsRoutes()

  constructor() {
    this.app = express()
    this.config()
    this.newsRoutes.routes(this.app)
  }

  private config(): void {
    this.app.all('/*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.header('Content-Type', 'application/json')
      next()
    })
  }

}

export default new App().app

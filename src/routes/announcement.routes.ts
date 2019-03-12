import { Application } from 'express'
import { AnnouncementController } from '../controllers/announcement.controller'
import { cache } from '../helpers/cache.helper'

export class AnnouncementRoutes {

  public announcementController: AnnouncementController = new AnnouncementController()

  public routes(app: Application): void {
    app.route('/announcements').get(cache('5 minutes'), this.announcementController.list)
    app.route('/announcement/:slug').get(cache('15 minutes'), this.announcementController.get)
  }
}

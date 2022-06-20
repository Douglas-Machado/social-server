import { Request, Response } from 'express'
import { CategoriesService } from '../services/CategoriesService'

class CategoriesController {
  async handle(req: Request, res: Response) {
    const service = new CategoriesService()

    const result = await service.execute()

    return res.json(result)
  }
}

export default new CategoriesController()

import { Request, Response } from 'express'
import { CategoriesService } from '../services/CategoriesService'

const service = new CategoriesService()

class CategoriesController {
  async handleListCategories(req: Request, res: Response) {
    const result = await service.listCategories()

    return res.json(result)
  }

  async handleListCategoryPosts(req: Request, res: Response) {
    const { category_id } = req.params
    const result = await service.listCategoryPosts(category_id)

    return res.json(result)
  }
}

export default new CategoriesController()

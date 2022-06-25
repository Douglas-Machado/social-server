import { Request, Response } from 'express'
import { CategoryService } from '../services/CategoryService'

const categoryService = new CategoryService()

class CategoryController {
  async handleListCategories(req: Request, res: Response) {
    const result = await categoryService.listCategories()

    return res.json(result)
  }

  async handleListCategoryPosts(req: Request, res: Response) {
    const { category_id } = req.params
    const result = await categoryService.listCategoryPosts(category_id)

    return res.json(result)
  }
}

export default new CategoryController()

import { Request, Response } from 'express'
import { CreatePostService } from '../services/CreatePostService'
class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, content, authorId } = req.body
    const service = new CreatePostService()

    const result = await service.execute({ title, content, authorId })

    return res.json(result)
  }
}

export default new CreatePostController()

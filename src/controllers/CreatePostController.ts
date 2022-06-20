import { Request, Response } from 'express'
import { CreatePostService } from '../services/CreatePostService'

export interface ICreatePostParams {
  title: string
  content: string
  authorId: string
  tags: string[]
  category: string
}

class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, content, authorId, tags, category }: ICreatePostParams =
      req.body
    const service = new CreatePostService()

    try {
      const result = await service.execute({
        title,
        content,
        authorId,
        tags,
        category,
      })

      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }
}

export default new CreatePostController()

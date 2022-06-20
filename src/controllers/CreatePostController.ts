import { Request, Response } from 'express'
import { CreatePostService } from '../services/CreatePostService'

export interface ICreatePostParams {
  title: string
  content: string
  authorId: string
  tags: string[]
}

class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, content, authorId, tags }: ICreatePostParams = req.body
    const service = new CreatePostService()

    const result = await service.execute({
      title,
      content,
      authorId,
      tags,
    })

    return res.json(result)
  }
}

export default new CreatePostController()

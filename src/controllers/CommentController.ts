import { Request, Response } from 'express'
import { CommentService } from '../services/CommentService'
const commentService = new CommentService()

class CommentController {
  async handleCreateComment(req: Request, res: Response) {
    const result = await commentService.createPost(req.body)

    return res.json(result)
  }
}

export default new CommentController()

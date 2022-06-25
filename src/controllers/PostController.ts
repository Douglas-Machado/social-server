import { Request, Response } from 'express'
import { StructError } from 'superstruct'
import { PostService } from '../services/PostService'

const service = new PostService()

export interface IPost {
  title: string
  slug: string
  content: string
  author_id: string
  category_id: string
}

export interface IQueryParams {
  index: string | number
  limit: string | number
}

interface IUserId {
  user_id: string
}

class PostController {
  async handleCreatePost(req: Request, res: Response) {
    try {
      const result = await service.createPost(req.body as IPost)

      return res.json(result)
    } catch (e) {
      if (e instanceof StructError) {
        return res.status(400).json({ message: `The ${e.value} is not a valid ${e.key}` })
      }
      return res.status(400).json({ message: e })
    }
  }

  async handleGetPost(req: Request, res: Response) {
    const { post_id } = req.params
    try {
      const result = await service.getPost(post_id)
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async handleListPosts(req: Request, res: Response) {
    try {
      const result = await service.listPosts(req.query as unknown as IQueryParams)
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong' })
    }
  }

  async handleEditPost(req: Request, res: Response) {
    const { post_id } = req.params
    const { user_id } = req.headers

    try {
      const result = await service.editPost(post_id, user_id, req.body)
      return res.json(result)
    } catch (e) {
      if (e.message) return res.status(401).json({ message: e.message })
      return res.status(400).json({ message: e })
    }
  }

  async handleDeletePost(req: Request, res: Response) {
    const { post_id } = req.params
    const { user_id } = req.headers as unknown as IUserId

    try {
      const result = await service.deletePost(post_id, user_id)
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }
}

export default new PostController()

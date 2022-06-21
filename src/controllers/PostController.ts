import { Request, Response } from 'express'
import { CreatePostService } from '../services/PostService'

const service = new CreatePostService()

export interface IPost {
  title?: string
  content?: string
  author_id?: string
  tags?: string[]
  category_id?: string
}

export type index = number
export type limit = number

class PostController {
  async handleCreatePost(req: Request, res: Response) {
    console.log(req.body)
    const { title, content, author_id, tags, category_id }: IPost = req.body

    try {
      const result = await service.createPost({
        title,
        content,
        author_id,
        tags,
        category_id,
      })

      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }

  async handleGetPost(req: Request, res: Response) {
    const { post_id } = req.params
    try {
      const result = await service.getPost(post_id)
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }

  async handleListPosts(req: Request, res: Response) {
    const maximumNumberOfPosts = parseInt(process.env.MAXIMUM_NUMBER_OF_POSTS)

    const index: index = Number(req.query.index)
    const postsLimit: limit = Number(req.query.limit)

    try {
      if (maximumNumberOfPosts < postsLimit)
        throw `The maximum number of posts is ${maximumNumberOfPosts}`

      const result = await service.listPosts(postsLimit, index)
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }

  async handleEditPost(req: Request, res: Response) {
    const { title, content, author_id, tags, category_id }: IPost = req.body

    try {
      const result = await service.editPost({ title, content, author_id, tags, category_id })
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }

  async handleDeletePost(req: Request, res: Response) {
    const { post_id } = req.params
    const { user_id } = req.headers

    try {
      const result = await service.deletePost(post_id, user_id)

      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }
}

export default new PostController()

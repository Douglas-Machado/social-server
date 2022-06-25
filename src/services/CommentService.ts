import { prismaClient } from '../prisma/prisma'

interface IPostParams {
  author_id: string
  post_id: string
  content: string
}

class CommentService {
  async createPost({ author_id, post_id, content }: IPostParams) {
    const post = await prismaClient.comment.create({
      data: {
        author_id: author_id,
        post_id: post_id,
        content: content,
      },
    })
    return post
  }
}

export { CommentService }

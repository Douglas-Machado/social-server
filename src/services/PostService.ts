import { prismaClient } from '../prisma/prisma'
import { IPost } from '../controllers/PostController'
import { Prisma } from '@prisma/client'

class CreatePostService {
  async execute({ title, content, author_id, tags, category_id }: IPost) {
    try {
      const post = await prismaClient.post.create({
        data: {
          title: title,
          content: content,
          author_id: author_id,
          tags: tags,
          category_id: category_id,
        },
      })
      return post
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw 'Missing Params'
      }
    }
  }

  async listPosts(postsLimit?: number, index?: number) {
    if (!postsLimit) postsLimit = 20
    if (!index) index = 0

    const [posts, totalPosts] = await prismaClient.$transaction([
      prismaClient.post.findMany({ take: postsLimit, skip: index }),
      prismaClient.post.count(),
    ])

    return { totalPosts, posts }
  }
}

export { CreatePostService }

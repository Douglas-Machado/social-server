import { prismaClient } from '../prisma/prisma'
import { ICreatePostParams } from '../controllers/CreatePostController'
import { Prisma } from '@prisma/client'

class CreatePostService {
  async execute({
    title,
    content,
    authorId,
    tags,
    category,
  }: ICreatePostParams) {
    try {
      const post = await prismaClient.post.create({
        data: {
          title: title,
          content: content,
          author_id: authorId,
          tags: tags,
          category_id: category,
        },
      })
      return post
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw 'Missing Params'
      }
    }
  }
}

export { CreatePostService }

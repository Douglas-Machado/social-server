import { prismaClient } from '../prisma/prisma'
import { ICreatePostParams } from '../controllers/CreatePostController'

class CreatePostService {
  async execute({ title, content, authorId, tags }: ICreatePostParams) {
    const post = await prismaClient.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
        tags: tags,
      },
    })
    return post
  }
}

export { CreatePostService }

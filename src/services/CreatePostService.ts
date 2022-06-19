import { prismaClient } from '../prisma/prisma'

interface ICreatePostParams {
  title: string
  content: string
  authorId: string
}

class CreatePostService {
  async execute({ title, content, authorId }: ICreatePostParams) {
    const post = prismaClient.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
      },
    })
    return post
  }
}

export { CreatePostService }

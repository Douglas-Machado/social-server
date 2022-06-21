import { prismaClient } from '../prisma/prisma'
import { IPost } from '../controllers/PostController'
import { Prisma } from '@prisma/client'

class CreatePostService {
  async createPost({ title, content, author_id, tags, category_id }: IPost) {
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

  async getPost(post_id: string) {
    const post = await prismaClient.post.findUnique({
      where: {
        id: post_id,
      },
    })

    if (!post) throw 'Post not found'

    return post
  }

  async listPosts(postsLimit?: number, index?: number) {
    if (!postsLimit) postsLimit = 20
    if (!index) index = 0

    const [posts, totalPosts] = await prismaClient.$transaction([
      prismaClient.post.findMany({
        take: postsLimit,
        skip: index,
        orderBy: {
          created_at: 'asc',
        },
      }),
      prismaClient.post.count(),
    ])

    return { totalPosts, posts }
  }

  async editPost({ title, content, author_id, tags, category_id }: IPost) {
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

  async deletePost(post_id: string, user_id) {
    try {
      const post = await this.getPost(post_id)

      if (user_id !== post.author_id) throw 'You must be the author to delete this post'
      await prismaClient.post.delete({
        where: { id: post_id },
      })

      return { message: 'deleted successfully' }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw e.meta.cause
        }
      }

      throw e
    }
  }
}

export { CreatePostService }
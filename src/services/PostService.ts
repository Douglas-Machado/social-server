import { prismaClient } from '../prisma/prisma'
import { IPost } from '../controllers/PostController'
import { Prisma } from '@prisma/client'

import { UserService } from './UserService'
const userService = new UserService()

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

  async editPost(post_id, user_id, { title, content, author_id, tags, category_id }: IPost) {
    try {
      const user = await userService.getUser(user_id)
      const post = await this.getPost(post_id)

      if (user_id !== post.author_id && user.name !== process.env.ADMIN_NAME)
        throw 'You must be the author to edit this post'

      const updatedPost = await prismaClient.post.update({
        where: {
          id: post_id,
        },
        data: {
          title: title,
          content: content,
          author_id: author_id,
          tags: tags,
          category_id: category_id,
        },
      })
      return updatedPost
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw 'Missing Params'
      }
      throw e
    }
  }

  async deletePost(post_id: string, user_id) {
    try {
      const user = await userService.getUser(user_id)
      const post = await this.getPost(post_id)

      if (user_id !== post.author_id && user.name !== process.env.ADMIN_NAME)
        throw 'You must be the author to delete this post'
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

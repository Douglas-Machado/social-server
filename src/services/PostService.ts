import { prismaClient } from '../prisma/prisma'
import { IPost, IQueryParams } from '../controllers/PostController'
import { Prisma } from '@prisma/client'
import { assert, object, string, size } from 'superstruct'

import { UserService } from './UserService'
const userService = new UserService()

type content = { content: string }

const CreatePost = object({
  title: size(string(), 2, 50),
  slug: size(string(), 2, 50),
  content: size(string(), 2, 400),
  author_id: size(string(), 36, 36),
  category_id: size(string(), 36, 36),
})

type CreatePost = Omit<Prisma.PostCreateArgs['data'], 'title'>

const UpdatePost = object({
  content: size(string(), 2, 400),
})

type UpdatePost = Prisma.PostUpdateArgs['data']['content']

class PostService {
  async createPost({ title, slug, content, author_id, category_id }: IPost) {
    assert({ title, slug, content, author_id, category_id }, CreatePost)
    try {
      const post = await prismaClient.post.create({
        data: {
          title: title,
          slug: slug,
          content: content,
          author_id: author_id,
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
      include: {
        comments: true,
      },
    })
    if (post === null) throw new Error('Post not found')
    return post
  }

  async listPosts(queryParams?: IQueryParams) {
    if (!queryParams) queryParams = { index: 0, limit: undefined }
    const { index, limit } = queryParams
    const [posts, totalPosts] = await prismaClient.$transaction([
      prismaClient.post.findMany({
        orderBy: {
          created_at: 'asc',
        },
        skip: typeof index === 'string' ? Number(index) : 0,
        take: typeof limit === 'string' ? Number(limit) : undefined,
        select: {
          id: true,
          title: true,
          content: true,
          author_id: true,
          created_at: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          comments: {
            select: {
              author_id: true,
              content: true,
              created_at: true,
            },
          },
        },
      }),
      prismaClient.post.count(),
    ])

    return { totalPosts, posts }
  }

  async updatePost(post_id: string, user_id, { content }: content) {
    assert({ content }, UpdatePost)
    try {
      if (!content) throw new Error('Invalid content')
      const user = await this.verifyUser(user_id)
      const post = await this.getPost(post_id)

      if (user_id !== post.author_id && user.name !== process.env.ADMIN_NAME)
        throw new Error('You must be the author to edit this post')

      const updatedPost = await prismaClient.post.update({
        where: {
          id: post_id,
        },
        data: {
          content: content,
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

  async deletePost(post_id: string, user_id: string) {
    try {
      const user = await this.verifyUser(user_id)
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
      if (e.message) throw e.message
      throw e
    }
  }

  async verifyUser(user_id: string) {
    try {
      const user = await userService.getUser(user_id)
      return user
    } catch (e) {
      if (e.message) throw 'Invalid user'
    }
  }
}

export { PostService }

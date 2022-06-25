import { Prisma, User } from '@prisma/client'
import { prismaClient } from '../prisma/prisma'
import { assert, object, string, size, refine } from 'superstruct'
import validator from 'validator'
import { IQueryParams } from '../controllers/PostController'

const CreateUser = object({
  name: size(string(), 2, 50),
  email: refine(string(), 'email', (email) => validator.isEmail(email)),
  job_title: size(string(), 2, 50),
})

type CreateUser = Omit<Prisma.UserCreateArgs['data'], 'id'>

class UserService {
  async createUser(params: CreateUser): Promise<User> {
    assert(params, CreateUser)
    try {
      const user = await prismaClient.user.create({
        data: {
          name: params.name,
          email: params.email,
          job_title: params.job_title,
        },
      })
      return user
    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw 'Missing Params'
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw `${e.meta.target[0]} must be unique`
        }
      }
    }
  }

  async getUser(user_id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        job_title: true,
      },
    })

    if (!user) throw new Error('user not found')

    return user
  }

  async listUsers(queryParams?: IQueryParams) {
    if (!queryParams) queryParams = { index: 0, limit: undefined }
    const { index, limit } = queryParams
    const [users, totalUsers] = await prismaClient.$transaction([
      prismaClient.user.findMany({
        where: {
          name: {
            not: process.env.ADMIN_NAME,
          },
        },
        orderBy: {
          created_at: 'asc',
        },
        take: typeof limit === 'string' ? Number(limit) : undefined,
        skip: typeof index === 'string' ? Number(index) : 0,
      }),
      prismaClient.user.count({
        skip: 1,
      }),
    ])

    return { totalUsers, users }
  }
}

export { UserService }

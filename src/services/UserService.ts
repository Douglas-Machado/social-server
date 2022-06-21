import { Prisma } from '@prisma/client'
import { prismaClient } from '../prisma/prisma'
import validator from 'validator'

interface ICreateUserParams {
  name: string
  email: string
  jobTitle: string
}

class UserService {
  async createUser({ name, email, jobTitle }: ICreateUserParams) {
    if (!validator.isEmail(email)) throw `${email} is not valid`

    try {
      const user = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
          job_title: jobTitle,
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
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: user_id,
        },
      })

      if (!user) throw 'user not found'

      return user
    } catch (e) {
      console.log(e)
    }
  }

  async listUsers(postsLimit?: number, index?: number) {
    if (!postsLimit) postsLimit = 20
    if (!index) index = 0

    const [users, totalUsers] = await prismaClient.$transaction([
      prismaClient.user.findMany({
        where: {
          name: {
            not: 'Admin',
          },
        },
        orderBy: {
          created_at: 'asc',
        },
        take: postsLimit,
        skip: index,
      }),
      prismaClient.user.count({
        skip: 1,
      }),
    ])

    return { totalUsers, users }
  }
}

export { UserService }

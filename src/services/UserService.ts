import { Prisma } from '@prisma/client'
import { prismaClient } from '../prisma/prisma'

interface ICreateUserParams {
  name: string
  email: string
  jobTitle: string
}

class CreateUserService {
  async createUser({ name, email, jobTitle }: ICreateUserParams) {
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
          throw 'Email must be unique'
        }
      }
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

export { CreateUserService }

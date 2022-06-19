import { Prisma } from '@prisma/client'
import { prismaClient } from '../prisma/prisma'

interface ICreateUserParams {
  name: string
  email: string
  jobTitle: string
}

class CreateUserService {
  async execute({ name, email, jobTitle }: ICreateUserParams) {
    try {
      const user = await prismaClient.user.create({
        data: {
          name: name,
          email: email,
          jobTitle: jobTitle,
        },
      })
      return user
    } catch (e) {
      console.log(e)
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
}

export { CreateUserService }

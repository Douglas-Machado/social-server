import { prismaClient } from '../prisma/prisma'
import { ICreateProfileParams } from '../controllers/ProfileController'
import { Prisma } from '@prisma/client'

class ProfileService {
  async createProfile({ biography, userId }: ICreateProfileParams) {
    try {
      const profile = await prismaClient.profile.create({
        data: {
          biography: biography,
          user_id: userId,
        },
      })
      return profile
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') throw 'The user can create only 1 profile'
      }
    }
  }
}

export { ProfileService }

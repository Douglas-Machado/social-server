import { prismaClient } from '../prisma/prisma'
import { ICreateProfileParams } from '../controllers/ProfileController'
import { Prisma } from '@prisma/client'
import { assert, object, string, size } from 'superstruct'

const CreateProfile = object({
  biography: size(string(), 20, 400),
  user_id: size(string(), 36, 36),
})

type CreateProfile = Omit<Prisma.ProfileCreateArgs['data'], 'id'>

class ProfileService {
  async createProfile({ biography, user_id }: ICreateProfileParams) {
    assert({ biography, user_id }, CreateProfile)
    try {
      const profile = await prismaClient.profile.create({
        data: {
          biography: biography,
          user_id: user_id,
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

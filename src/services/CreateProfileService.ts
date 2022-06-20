import { prismaClient } from '../prisma/prisma'
import { ICreateProfileParams } from '../controllers/CreateProfileController'

class CreateProfileService {
  async execute({ biography, userId }: ICreateProfileParams) {
    const profile = await prismaClient.profile.create({
      data: {
        biography: biography,
        userId: userId,
      },
    })
    return profile
  }
}

export { CreateProfileService }

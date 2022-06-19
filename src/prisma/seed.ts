import { prismaClient } from './prisma'

class CreateAdminUser {
  async create() {
    await prismaClient.user.create({
      data: {
        name: 'Admin',
        email: 'admin@admin.com',
        jobTitle: 'Admin',
      },
    })
  }
}

const createAdminUser = new CreateAdminUser()

createAdminUser.create()

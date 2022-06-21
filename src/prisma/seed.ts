import { prismaClient } from './prisma'

class CreateSeeds {
  async createAdmin() {
    await prismaClient.user.create({
      data: {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        job_title: 'Admin',
      },
    })
  }

  async createCategories() {
    await prismaClient.category.createMany({
      data: [
        { name: 'Memes' },
        { name: 'Technology' },
        { name: 'Fashion' },
        { name: 'Sports' },
        { name: 'Games' },
        { name: 'News' },
      ],
    })
  }
}

const createSeeds = new CreateSeeds()

createSeeds.createAdmin()
createSeeds.createCategories()

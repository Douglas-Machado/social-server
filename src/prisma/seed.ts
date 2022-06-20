import { prismaClient } from './prisma'

class CreateSeeds {
  async createAdmin() {
    await prismaClient.user.create({
      data: {
        name: 'Admin',
        email: 'admin@admin.com',
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

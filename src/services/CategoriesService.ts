import { prismaClient } from '../prisma/prisma'

class CategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    return categories
  }
}

export { CategoriesService }

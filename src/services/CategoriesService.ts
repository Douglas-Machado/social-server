import { prismaClient } from '../prisma/prisma'

class CategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    return { categories: categories }
  }
}

export { CategoriesService }

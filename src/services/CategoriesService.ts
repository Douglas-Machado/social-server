import { prismaClient } from '../prisma/prisma'

class CategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany()
    return categories
  }
}

export { CategoriesService }

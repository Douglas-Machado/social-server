import { prismaClient } from '../prisma/prisma'

class CategoriesService {
  async listCategories() {
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    return { categories: categories }
  }

  async listCategoryPosts(category_id) {
    const posts = await prismaClient.category.findUnique({
      where: {
        id: category_id,
      },
      select: {
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            author_id: true,
            tags: true,
          },
        },
      },
    })
    return posts
  }
}

export { CategoriesService }

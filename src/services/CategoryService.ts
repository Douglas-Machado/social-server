import { prismaClient } from '../prisma/prisma'

class CategoryService {
  async listCategories() {
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return { categories: categories }
  }

  async listCategoryPosts(category_id: string) {
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
          },
        },
      },
    })

    if (!posts) return 'Category not found'
    if (Object.keys(posts).length == 0) return 'This category is empty, register a new post'

    return posts
  }
}

export { CategoryService }

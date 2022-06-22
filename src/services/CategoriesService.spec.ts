import { CategoriesService } from './CategoriesService'
const categoriesService = new CategoriesService()

describe('Categories', () => {
  test('Should return the categories list', async () => {
    await expect(categoriesService.listCategories()).resolves.not.toThrow()
  })

  test('Should return the posts of received category', async () => {
    await expect(categoriesService.listCategoryPosts('009a5efd')).resolves.not.toThrow()
  })

  test('Should return the posts of received category', async () => {
    await expect(
      categoriesService.listCategoryPosts('437878f0-c560-437f-8953-4cf01ef871b2'),
    ).resolves.not.toThrow()
  })
})

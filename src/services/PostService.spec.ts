import { PostService } from './PostService'
const postService = new PostService()

describe('Posts', () => {
  test('Should return posts', async () => {
    await expect(postService.listPosts()).resolves.not.toThrow()
  })

  test('Should throw when an invalid ID is received', async () => {
    await expect(postService.getPost('437878f0-c560-437f')).rejects.toThrow()
  })
})

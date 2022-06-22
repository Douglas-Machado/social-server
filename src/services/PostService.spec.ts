import { PostService } from './PostService'
const postService = new PostService()

describe('Posts', () => {
  test('Should return all(maximum 20) posts', async () => {
    await expect(postService.listPosts()).resolves.not.toThrow()
  })

  test('Should return one post', async () => {
    await expect(postService.getPost('f592a3ab-f102-438f-a1ae-c0d2147d684a')).resolves.not.toThrow()
  })

  test('Should throw when an invalid ID is received', async () => {
    await expect(postService.getPost('437878f0-c560-437f')).rejects.toThrow()
  })
})

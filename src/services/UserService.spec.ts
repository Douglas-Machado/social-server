import { UserService } from './UserService'
const userService = new UserService()

describe('Posts', () => {
  test('Should throw error when the user_id is invalid', async () => {
    await expect(userService.getUser('7ea9f2')).rejects.toThrow()
  })

  test('Should return users', async () => {
    await expect(userService.listUsers()).resolves.not.toThrow()
  })
})

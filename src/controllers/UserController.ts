import { Request, Response } from 'express'
import { CreateUserService } from '../services/UserService'
import { index, limit } from './PostController'

const service = new CreateUserService()

class UserController {
  async handleCreateUser(req: Request, res: Response) {
    const { name, email, jobTitle } = req.body
    try {
      const result = await service.createUser({ name, email, jobTitle })
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }

  async handleListUsers(req: Request, res: Response) {
    const maximumNumberOfPosts = parseInt(process.env.MAXIMUM_NUMBER_OF_POSTS)

    const index: index = Number(req.query.index)
    const postsLimit: limit = Number(req.query.limit)

    try {
      if (maximumNumberOfPosts < postsLimit)
        throw `The maximum number of posts is ${maximumNumberOfPosts}`

      const result = await service.listUsers(postsLimit, index)

      return res.json(result)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UserController()

import { Request, Response } from 'express'
import { StructError } from 'superstruct'
import { UserService } from '../services/UserService'
import { IQueryParams } from './PostController'

const service = new UserService()

class UserController {
  async handleCreateUser(req: Request, res: Response) {
    try {
      const result = await service.createUser(req.body)
      return res.json(result)
    } catch (e) {
      if (e instanceof StructError) {
        return res.status(400).json({ message: `The ${e.value} is not a valid ${e.key}` })
      }
      return res.status(400).json({ message: e })
    }
  }

  async handleGetUser(req: Request, res: Response) {
    const { user_id } = req.params

    try {
      const result = await service.getUser(user_id)

      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async handleListUsers(req: Request, res: Response) {
    try {
      const result = await service.listUsers(req.query as unknown as IQueryParams)

      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong' })
    }
  }
}

export default new UserController()

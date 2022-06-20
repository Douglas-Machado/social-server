import { Request, Response } from 'express'
import { CreateUserService } from '../services/UserService'
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
    try {
      const result = await service.listUsers()

      return res.json(result)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UserController()

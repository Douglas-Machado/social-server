import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, jobTitle } = req.body
    try {
      const service = new CreateUserService()
      const result = await service.execute({ name, email, jobTitle })
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }
}

export default new CreateUserController()

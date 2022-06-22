import { Request, Response } from 'express'
import { ProfileService } from '../services/ProfileService'

export interface ICreateProfileParams {
  biography: string
  userId: string
}

class CreateProfileController {
  async handle(req: Request, res: Response) {
    try {
      const { biography, userId }: ICreateProfileParams = req.body
      const service = new ProfileService()
      const result = await service.createProfile({ biography, userId })
      return res.json(result)
    } catch (e) {
      return res.status(400).json({ message: e })
    }
  }
}

export default new CreateProfileController()

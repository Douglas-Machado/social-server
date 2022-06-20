import { Request, Response } from 'express'
import { CreateProfileService } from '../services/CreateProfileService'

export interface ICreateProfileParams {
  biography: string
  userId: string
}

class CreateProfileController {
  async handle(req: Request, res: Response) {
    const { biography, userId }: ICreateProfileParams = req.body
    const service = new CreateProfileService()
    const result = await service.execute({ biography, userId })
    return res.json(result)
  }
}

export default new CreateProfileController()

import { Request, Response } from 'express'
import { StructError } from 'superstruct'
import { ProfileService } from '../services/ProfileService'
const service = new ProfileService()

export interface ICreateProfileParams {
  biography: string
  user_id: string
}

class CreateProfileController {
  async handle(req: Request, res: Response) {
    try {
      const result = await service.createProfile(req.body)
      return res.json(result)
    } catch (e) {
      if (e instanceof StructError) {
        console.log(e.failures())
        return res.status(400).json({ message: `The '${e.value}' is not a valid ${e.key}` })
      }
      return res.status(400).json({ message: e })
    }
  }
}

export default new CreateProfileController()

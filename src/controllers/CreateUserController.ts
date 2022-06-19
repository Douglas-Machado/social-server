import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, jobTitle } = req.body;
    const service = new CreateUserService();
    const result = service.execute({ name, jobTitle });
    return res.json(result);
  }
}

export default new CreateUserController();

import { Router } from "express";
import createUserController from "./controllers/CreateUserController";

const routes = Router();

routes.post("create/user", createUserController.handle);

export { routes };

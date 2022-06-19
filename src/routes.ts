import { Router } from 'express'
import createUserController from './controllers/CreateUserController'
import createPostController from './controllers/CreatePostController'

const routes = Router()

routes.post('/create/user', createUserController.handle)
routes.post('/create/post', createPostController.handle)

export { routes }

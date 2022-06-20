import { Router } from 'express'
import userController from './controllers/UserController'
import createPostController from './controllers/CreatePostController'
import createProfileController from './controllers/CreateProfileController'

import categoriesController from './controllers/CategoriesController'

const routes = Router()

routes.get('/users', userController.handleListUsers)
routes.post('/create/user', userController.handleCreateUser)

routes.post('/create/profile', createProfileController.handle)
routes.post('/create/post', createPostController.handle)

routes.get('/categories', categoriesController.handle)

export { routes }

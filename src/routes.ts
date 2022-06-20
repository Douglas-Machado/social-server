import { Router } from 'express'
import createUserController from './controllers/CreateUserController'
import createPostController from './controllers/CreatePostController'
import createProfileController from './controllers/CreateProfileController'

import categoriesController from './controllers/CategoriesController'

const routes = Router()

routes.post('/create/user', createUserController.handle)
routes.post('/create/profile', createProfileController.handle)
routes.post('/create/post', createPostController.handle)

routes.get('/categories', categoriesController.handle)

export { routes }

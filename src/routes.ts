import { Router } from 'express'
import userController from './controllers/UserController'
import postController from './controllers/PostController'
import createProfileController from './controllers/CreateProfileController'

import categoriesController from './controllers/CategoriesController'

const routes = Router()

routes.get('/users', userController.handleListUsers)
routes.post('/create/user', userController.handleCreateUser)

routes.post('/create/profile', createProfileController.handle)

routes.get('/posts', postController.handleListPosts)
routes.post('/create/post', postController.handleCreatePost)

routes.get('/categories', categoriesController.handle)

export { routes }

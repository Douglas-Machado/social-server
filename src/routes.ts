import { Router } from 'express'
import userController from './controllers/UserController'
import postController from './controllers/PostController'
import createProfileController from './controllers/CreateProfileController'

import categoriesController from './controllers/CategoriesController'

const routes = Router()

routes.get('/users', userController.handleListUsers)
routes.post('/users/create', userController.handleCreateUser)
routes.get('/users/:user_id', userController.handleGetUser)

routes.post('/profile/create', createProfileController.handle)

routes.get('/posts', postController.handleListPosts)
routes.post('/posts/create', postController.handleCreatePost)
routes.get('/posts/:post_id', postController.handleGetPost)
routes.put('/posts/:post_id', postController.handleEditPost)
routes.delete('/posts/delete/:post_id', postController.handleDeletePost)

routes.get('/categories', categoriesController.handleListCategories)
routes.get('/categories/:category_id', categoriesController.handleListCategoryPosts)

export { routes }

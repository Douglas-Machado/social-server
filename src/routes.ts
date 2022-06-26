import { Router } from 'express'
import userController from './controllers/UserController'
import profileController from './controllers/ProfileController'
import postController from './controllers/PostController'
import commentController from './controllers/CommentController'
import categoryController from './controllers/CategoryController'

const routes = Router()

routes.get('/users', userController.handleListUsers)
routes.post('/users/create', userController.handleCreateUser)
routes.get('/users/:user_id', userController.handleGetUser)

routes.post('/profile/create', profileController.handle)

routes.get('/posts', postController.handleListPosts)
routes.post('/posts/create', postController.handleCreatePost)
routes.get('/posts/:post_id', postController.handleGetPost)
routes.put('/posts/:post_id', postController.handleUpdatePost)
routes.delete('/posts/delete/:post_id', postController.handleDeletePost)

routes.post('/comments/create', commentController.handleCreateComment)

routes.get('/categories', categoryController.handleListCategories)
routes.get('/categories/:category_id', categoryController.handleListCategoryPosts)

export { routes }

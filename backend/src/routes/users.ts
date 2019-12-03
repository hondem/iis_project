import Router from 'koa-router'
import Controller from '../controllers/users'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/users', Controller.getAll)
router.get('/users/:id', Controller.getById)

router.post('/users/create', Auth.god, Controller.create)
router.post('/users/login', Controller.login)

router.patch('/users/:id', Auth.god, Controller.update)
router.patch('/users/:id/password', Auth.god, Controller.changePassword)

export default router.routes()
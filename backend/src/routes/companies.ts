import Router from 'koa-router'
import Controller from '../controllers/companies'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies', Auth.god, Controller.getAll)
router.get('/companies/:id', Auth.god, Controller.getById)
router.post('/companies/create', Auth.god, Controller.create)
router.patch('/companies/:id', Auth.god, Controller.update)

export default router.routes()
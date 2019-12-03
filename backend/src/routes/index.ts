import Router from 'koa-router'

/**
 * Importing all endpoints
 */
import Users from './users'
import Companies from './companies'
import Employees from './employees'
import Wage from './wage'
import Folders from './folders'
import Salary from './salary'


// Create new router
const router: Router = new Router()

router.use(Users)
router.use(Companies)
router.use(Employees)
router.use(Wage)
router.use(Folders)
router.use(Salary)

export default router.routes()
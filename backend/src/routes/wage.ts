import Router from 'koa-router'
import Controller from '../controllers/wage'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees/:employeeId/wage', Auth.minAccountant, Controller.getByEmployee)
router.get('/companies/:companyId/employees/:employeeId/wage/:date', Auth.minAccountant, Controller.getByEmployeeAndDate)
router.get('/companies/:companyId/employees/:employeeId/wage/effective/:date', Auth.minAccountant, Controller.getByEmployeeAndEffectiveDate)
router.patch('/companies/:companyId/employees/:employeeId/wage/:date', Auth.minAccountant, Controller.update)
router.post('/companies/:companyId/employees/:employeeId/wage', Auth.minAccountant, Controller.create)
router.delete('/companies/:companyId/employees/:employeeId/wage/:date', Auth.minAccountant, Controller.remove)

export default router.routes()
import Router from 'koa-router'
import Controller from '../controllers/employees'
import Auth from '../middleware/auth'

const router: Router = new Router()

router.get('/companies/:companyId/employees', Auth.minPersonalist, Controller.getByCompany)
router.get('/companies/:companyId/employees/:employeeId', Auth.minPersonalist, Controller.getByCompanyAndId)
router.get('/companies/:companyId/employees/:employeeId/calculate/:date', Auth.minAccountant, Controller.calculate)
router.post('/companies/:companyId/employees', Auth.personalistOrAdmin, Controller.create)
router.patch('/companies/:companyId/employees/:employeeId', Auth.minPersonalist, Controller.update)
router.delete('/companies/:companyId/employees/:employeeId', Auth.minPersonalist, Controller.remove)

export default router.routes()
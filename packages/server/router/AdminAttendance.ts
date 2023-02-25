import {Router} from 'express';
import AdminAttendanceController from "../controllers/AdminAttendanceController";


const AdminAttendanceRouter = Router()

const adminAttendanceController = new AdminAttendanceController()

AdminAttendanceRouter.get('/', adminAttendanceController.adminAttendanceList)
AdminAttendanceRouter.get('/:id', adminAttendanceController.adminAttendanceDetail)
AdminAttendanceRouter.post('/', adminAttendanceController.adminAttendanceCreate)
AdminAttendanceRouter.put('/:id', adminAttendanceController.adminAttendanceUpdate)
AdminAttendanceRouter.delete('/:id', adminAttendanceController.adminAttendanceDelete)
AdminAttendanceRouter.post('/disable', adminAttendanceController.adminAttendanceDisable)
AdminAttendanceRouter.post('/disable-timeout', adminAttendanceController.adminAttendanceDisableWhenTimeOut)


export default AdminAttendanceRouter

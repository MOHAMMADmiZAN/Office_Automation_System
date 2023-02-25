import AttendanceController from "../controllers/AttendanceController";

import {Router} from "express";


const AttendanceRouter = Router()

const attendanceController = new AttendanceController()

AttendanceRouter.get('/', attendanceController.attendanceList)
AttendanceRouter.get('/:id', attendanceController.attendanceDetail)
AttendanceRouter.post('/', attendanceController.attendanceCreate)
AttendanceRouter.put('/:id', attendanceController.attendanceUpdate)
AttendanceRouter.delete('/:id', attendanceController.attendanceDelete)
AttendanceRouter.get('/user/:id', attendanceController.attendanceFindByUser)


export default AttendanceRouter
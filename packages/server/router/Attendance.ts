import AttendanceController from "../controllers/AttendanceController";

import { Router } from "express";



const EventRouter = Router()

const attendanceController = new AttendanceController()

EventRouter.get('/', attendanceController.attendanceList)
EventRouter.get('/:id', attendanceController.attendanceDetail)
EventRouter.post('/', attendanceController.attendanceCreate)
EventRouter.put('/:id', attendanceController.attendanceUpdate)
EventRouter.delete('/:id', attendanceController.attendanceDelete)



export default EventRouter
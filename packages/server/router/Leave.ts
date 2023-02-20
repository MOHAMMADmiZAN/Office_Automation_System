import LeaveController from "../controllers/LeaveController";

import {Router} from "express";


const LeaveRouter = Router()

const leaveController = new LeaveController()

LeaveRouter.get('/', leaveController.leaveList)
LeaveRouter.get('/:id', leaveController.leaveDetail)
LeaveRouter.post('/', leaveController.leaveCreate)
LeaveRouter.put('/:id', leaveController.leaveUpdate)
LeaveRouter.delete('/:id', leaveController.leaveDelete)



export default LeaveRouter
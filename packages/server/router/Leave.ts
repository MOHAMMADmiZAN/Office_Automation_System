import LeaveController from "../controllers/LeaveController";

import {Router} from "express";
import {fileUpload} from "../utils/FileUpload";


const LeaveRouter = Router()

const leaveController = new LeaveController()

LeaveRouter.get('/', leaveController.leaveList)
LeaveRouter.get('/:id', leaveController.leaveDetail)
LeaveRouter.post('/', fileUpload.single('leaveAttachment'),leaveController.leaveCreate)
LeaveRouter.put('/:id', leaveController.leaveUpdate)
LeaveRouter.delete('/:id', leaveController.leaveDelete)


export default LeaveRouter
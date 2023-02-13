import UserBasicInfoController from "../controllers/UserBasicInfoController";

import { Router } from "express";



const UserBasicInfoRouter = Router()

const userBasicInfoController = new UserBasicInfoController()

UserBasicInfoRouter.get('/', userBasicInfoController.userBasicInfoList)
UserBasicInfoRouter.get('/:id', userBasicInfoController.userBasicInfoDetail)
UserBasicInfoRouter.post('/', userBasicInfoController.userBasicInfoCreate)
UserBasicInfoRouter.put('/:id', userBasicInfoController.userBasicInfoUpdate)
UserBasicInfoRouter.delete('/:id', userBasicInfoController.userBasicInfoDelete)



export default UserBasicInfoRouter
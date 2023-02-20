import RoleController from "../controllers/RoleController";

import {Router} from "express";


const RoleRouter = Router()

const roleController = new RoleController()

RoleRouter.get('/', roleController.findUserRoles)
RoleRouter.get('/:id', roleController.findUserRole)
RoleRouter.post('/', roleController.createUserRole)
RoleRouter.delete('/:id', roleController.deleteUserRole)
RoleRouter.put('/:id', roleController.updateUserRole)



export default RoleRouter
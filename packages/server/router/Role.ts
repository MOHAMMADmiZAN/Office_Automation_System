import RoleController from "../controllers/RoleController";

const Router = require('express').Router



const RoleRouter = Router()

const roleController =  new RoleController()

RoleRouter.get('/', roleController.findUserRoles)
RoleRouter.get('/:id', roleController.findUserRole)
RoleRouter.post('/', roleController.createUserRole)
RoleRouter.delete('/:id', roleController.deleteUserRole)



export default RoleRouter
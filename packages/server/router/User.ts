import { Router } from "express";
import UserController from "../controllers/UserController";
import { fileUpload } from "../utils/FileUpload";



const UserRouter = Router()
const userController = new UserController();


UserRouter.get('/', userController.userList)
UserRouter.put('/changeAvatar/:id', fileUpload.single('image'), userController.avatarUpdate)



export default UserRouter
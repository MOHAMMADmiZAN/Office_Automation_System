import {Router} from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";



const userController = new UserController();
const UserRouter = Router()


UserRouter.get('/', userController.userList)



export default UserRouter
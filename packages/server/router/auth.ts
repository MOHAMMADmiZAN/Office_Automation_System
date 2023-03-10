import {Router} from "express";

import AuthController from "../controllers/AuthController";
import {fileUpload} from "../utils/FileUpload";

const authController = new AuthController()

const authRouter = Router()
authRouter.post('/login', authController.userLogin)
authRouter.post('/register', fileUpload.single('avatar'), authController.userRegister)

export default authRouter


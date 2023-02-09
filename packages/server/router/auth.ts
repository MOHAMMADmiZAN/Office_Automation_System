const Router = require('express').Router

import AuthController from "../controllers/AuthController";

const authController = new AuthController()

const authRouter = Router()
authRouter.post('/login', authController.userLogin)
authRouter.post('/register', authController.userRegister)

export default authRouter


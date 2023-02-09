import RoleRouter from "./Role";

const Router = require('express').Router
import authRouter from "./auth";


const router = Router()
router.use('/api/v1/auth',authRouter)
router.use('/api/v1/role',RoleRouter)



export default router

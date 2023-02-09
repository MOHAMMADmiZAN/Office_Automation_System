import RoleRouter from "./Role";

const Router = require('express').Router
import authRouter from "./auth";
import {ErrorWithStatus} from "../utils/error";


const router = Router()
router.use('/api/v1/auth',authRouter)
router.use('/api/v1/role',RoleRouter)

router.use((req, res, next) => {
    const error = new Error("Route not found");
    (error as ErrorWithStatus).status = 404;
    next(error);
});

export default router

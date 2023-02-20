import {Router} from "express";
import authRouter from "./auth";
import RoleRouter from "./Role";
import EventRouter from "./Event";
import AttendanceRouter from "./Attendance";
import {ErrorWithStatus} from "../utils/error";
import UserBasicInfoRouter from "./UserBasicInfo";
import OnboardRouter from "./Onboard";
import LeaveRouter from "./Leave";
import UserRouter from "./User";
import AuthMiddleware from "../middleware/Auth";
import UserDocumentRouter from "./UserDocument";

const router = Router()



router.use('/api/v1/auth', authRouter)
router.use('/api/v1/role', AuthMiddleware, RoleRouter)
router.use('/api/v1/event', AuthMiddleware, EventRouter)
router.use('/api/v1/attendance', AuthMiddleware, AttendanceRouter)
router.use('/api/v1/userbasicinfo', AuthMiddleware, UserBasicInfoRouter)
router.use('/api/v1/onboard', AuthMiddleware, OnboardRouter)
router.use('/api/v1/leave', AuthMiddleware, LeaveRouter)
router.use('/api/v1/user', AuthMiddleware, UserRouter)
router.use('/api/v1/user-document', AuthMiddleware, UserDocumentRouter)



router.use((req, res, next) => {
    const error = new Error("Route not found");
    (error as ErrorWithStatus).status = 404;
    next(error);
});

export default router

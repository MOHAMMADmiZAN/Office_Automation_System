import { Router } from "express";
import authRouter from "./auth";
import RoleRouter from "./Role";
import EventRouter from "./Event";
import AttendanceRouter from "./Attendance";
import { ErrorWithStatus } from "../utils/error";
import UserBasicInfoRouter from "./UserBasicInfo";
import OnboardRouter from "./Onboard";
import LeaveRouter from "./Leave";


const router = Router()
router.use('/api/v1/auth', authRouter)
router.use('/api/v1/role', RoleRouter)
router.use('/api/v1/event', EventRouter)
router.use('/api/v1/attendance', AttendanceRouter)
router.use('/api/v1/userbasicinfo', UserBasicInfoRouter)
router.use('/api/v1/onboard', OnboardRouter)
router.use('/api/v1/leave', LeaveRouter)


router.use((req, res, next) => {
    const error = new Error("Route not found");
    (error as ErrorWithStatus).status = 404;
    next(error);
});

export default router

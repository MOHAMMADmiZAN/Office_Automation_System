import AttendanceService from "../services/AttendanceService";
import { NextFunction, Response } from "express";


interface IAttendanceController {
    attendanceCreate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    attendanceDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    attendanceList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    attendanceDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    attendanceUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class AttendanceController extends AttendanceService implements IAttendanceController {

    public attendanceCreate = async (req, res, next) => {
        try {
            const data = await this.createAttendance(req.body);
            console.log('data', data);
            res.status(201).json({
                message: 'Attendance created successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public attendanceDetail = async (req, res, next) => {
        try {
            const role = await this.findAttendance('_id', req.params.id);
            res.status(200).json({
                message: 'Attendance found successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }

    public attendanceList = async (_req, res, next) => {
        try {
            const data = await this.findAttendances();
            res.status(200).json({
                message: 'Attendances found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public attendanceUpdate = async (req, res, next) => {
        try {
            const data = await this.updateAttendance(req.body, req.params.id);
            res.status(201).json({
                message: 'Attendance updated successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public attendanceDelete = async (req, res, next) => {
        try {
            const data = await this.deleteAttendance(req.params.id);
            res.status(200).json({
                message: 'Attendance deleted successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
}

export default AttendanceController;
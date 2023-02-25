import AdminAttendanceService from "../services/AdminAttendanceService";
import {NextFunction, Request, Response} from "express";
import errorHandler from "../utils/error";


interface IAdminAttendanceController {
    adminAttendanceCreate(req: Request, res: Response, next: NextFunction): Promise<void>;

    adminAttendanceDetail(req: Request, res: Response, next: NextFunction): Promise<void>;

    adminAttendanceList(req: Request, res: Response, next: NextFunction): Promise<void>;

    adminAttendanceDelete(req: Request, res: Response, next: NextFunction): Promise<void>;

    adminAttendanceUpdate(req: Request, res: Response, next: NextFunction): Promise<void>;

    adminAttendanceDisable(req: Request, res: Response, next: NextFunction): Promise<void>;

    adminAttendanceDisableWhenTimeOut(req: Request, res: Response, next: NextFunction): Promise<void>;


}

class AdminAttendanceController extends AdminAttendanceService implements IAdminAttendanceController {
    public adminAttendanceCreate = async (req, res, next) => {
        try {
            const running = await this.findRunningAttendance();
            if (running) {
                throw errorHandler('There is already a running attendance', 400)
            }


            const data = await this.createAdminAttendance(req.body);
            res.status(201).json({
                message: 'AdminAttendance created successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public adminAttendanceDetail = async (req, res, next) => {
        try {
            const role = await this.findAdminAttendance('_id', req.params.id);
            res.status(200).json({
                message: 'AdminAttendance found successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }

    public adminAttendanceList = async (req, res, next) => {
        try {
            const data = await this.findAdminAttendances();
            res.status(200).json({
                message: 'AdminAttendances found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public adminAttendanceUpdate = async (req, res, next) => {
        try {
            const data = await this.updateAdminAttendance(req.body, req.params.id);
            res.status(201).json({
                message: 'AdminAttendance updated successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public adminAttendanceDelete = async (req, res, next) => {
        try {
            const data = await this.deleteAdminAttendance(req.params.id);
            res.status(201).json({
                message: 'AdminAttendance deleted successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public adminAttendanceDisable = async (req, res, next) => {
        try {
            const data = await this.disableWhenCalled();
            res.status(201).json({
                message: 'AdminAttendance disabled successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
    public adminAttendanceDisableWhenTimeOut = async (req, res, next) => {
        try {
            await this.disableWhenTimeOut();
            res.status(201).json({
                message: 'AdminAttendance disabled successfully',
            })
        } catch (error: any) {
            next(error)
        }
    }


}


export default AdminAttendanceController;